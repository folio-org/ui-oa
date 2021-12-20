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
    <Badge>0</Badge>;
};

const formatter = {
  funder: e => {
    return e?.funder?.label;
  },
  aspectFunded: e => {
    return e?.aspectFunded?.label;
  },
};


const Funding = ({ request }) => {
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.fundings)}
      displayWhenOpen={renderBadge(request?.fundings)}
      label={<FormattedMessage id="ui-oa.publicationRequest.funding" />}
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              funder: <FormattedMessage id="ui-oa.publicationRequest.funder" />,
              aspectFunded: <FormattedMessage id="ui-oa.publicationRequest.aspectFunded" />,
            }}
            contentData={request?.fundings}
            formatter={formatter}
            visibleColumns={['funder', 'aspectFunded']}
          />
        </Col>
      </Row>

    </Accordion>
  );
};

Funding.propTypes = propTypes;

export default Funding;
