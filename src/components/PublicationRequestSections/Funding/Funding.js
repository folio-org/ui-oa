import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Row
} from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object
};

const Funding = ({ request }) => {
  console.log(request)
  return (
    <Accordion
      closedByDefault
      label={<FormattedMessage id="ui-oa.publicationRequest.funding" />}
    >
      <Row>
        <h5>To be implemented</h5>
      </Row>
    </Accordion>
  );
};

Funding.propTypes = propTypes;

export default Funding;
