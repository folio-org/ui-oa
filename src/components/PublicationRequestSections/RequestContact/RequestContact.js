import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Row
} from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object
};

const renderBadge = (requestContact) => {
  return requestContact ? <Badge>1</Badge> : <Badge>0</Badge>
}

const RequestContact = ({ request }) => {
  console.log(request)
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.requestContact)}
      displayWhenOpen={renderBadge(request?.requestContact)}
      label={<FormattedMessage id="ui-oa.publicationRequest.requestContact" />}
    >
      <Row>
        <h5>To be implemented</h5>
      </Row>
    </Accordion>
  );
};

RequestContact.propTypes = propTypes;

export default RequestContact;
