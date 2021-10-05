import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  MultiColumnList,
  Row
} from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object
};

const renderBadge = (funders) => {
  return funders ?
    <Badge>{funders?.length}</Badge> :
    <Badge>0</Badge>
}

const Funding = ({ request }) => {
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.funders)}
      displayWhenOpen={renderBadge(request?.funders)}
      label={<FormattedMessage id="ui-oa.publicationRequest.funding" />}
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              funder: <FormattedMessage id="ui-oa.publicationRequest.funder" />,
              aspectFunded: <FormattedMessage id="ui-oa.publicationRequest.aspectFunded" />,
            }}
            contentData={request?.funders}
            visibleColumns={['funder', 'aspectFunded']}
          />
        </Col>
      </Row>

    </Accordion>
  );
};

Funding.propTypes = propTypes;

export default Funding;
