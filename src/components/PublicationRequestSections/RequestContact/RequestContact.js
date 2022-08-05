import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Accordion, Badge, Card } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import PartyInfo from '../../PartySections/PartyInfo';

import urls from '../../../util/urls';

const propTypes = {
  request: PropTypes.object,
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
      <Card
        cardStyle="positive"
        headerStart={
          <AppIcon app="oa" iconKey="party" size="small">
            {request.requestContact?.partyOwner?.id ? (
              <Link to={urls.party(request.requestContact.partyOwner.id)}>
                <strong>{request?.requestContact?.partyOwner?.fullName}</strong>
              </Link>
            ) : (
              <strong>{request?.requestContact?.partyOwner?.fullName}</strong>
            )}
          </AppIcon>
        }
        roundedBorder
      >
        <PartyInfo isCard party={request?.requestContact?.partyOwner} />
      </Card>
    </Accordion>
  );
};

RequestContact.propTypes = propTypes;

export default RequestContact;
