import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
} from '@folio/stripes/components';

import PartyInfo from '../PartyInfo';

const propTypes = {
  request: PropTypes.object
};

const renderBadge = (requestContact) => {
  return requestContact ? <Badge>1</Badge> : <Badge>0</Badge>;
};

const RequestContact = ({ request }) => {
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.requestContact)}
      displayWhenOpen={renderBadge(request?.requestContact)}
      label={<FormattedMessage id="ui-oa.publicationRequest.requestContact" />}
    >
      <PartyInfo
        otherEmailAddresses={request?.otherEmailAddresses}
        party={request?.requestContact?.partyOwner}
        streetAddresses={request?.streetAddresses}
      />
    </Accordion>
  );
};

RequestContact.propTypes = propTypes;

export default RequestContact;
