import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
} from '@folio/stripes/components';

import RequestPartyInfo from '../RequestPartyInfo';

const propTypes = {
  request: PropTypes.object
};

const renderBadge = (correspondingAuthor) => {
  return correspondingAuthor ? <Badge>1</Badge> : <Badge>0</Badge>
}

const CorrespondingAuthor = ({ request }) => {
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.correspondingAuthor)}
      displayWhenOpen={renderBadge(request?.correspondingAuthor)}
      label={<FormattedMessage id="ui-oa.publicationRequest.correspondingAuthor" />}
    >
      <RequestPartyInfo party={request?.correspondingAuthor} />
    </Accordion>

  );
};

CorrespondingAuthor.propTypes = propTypes;

export default CorrespondingAuthor;
