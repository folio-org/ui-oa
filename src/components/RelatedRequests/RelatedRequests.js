import { useState } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  MultiColumnList,
  Row,
} from '@folio/stripes/components';

import getSortedItems from '../../util/getSortedItems';

const propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object),
  requestsFormatter: PropTypes.arrayOf(PropTypes.object),
  sortFormatter: PropTypes.object,
};

const RelatedRequests = ({ requests, requestsFormatter, sortFormatter }) => {
  const [sortedColumn, setSortedColumn] = useState({
    column: 'requestDate',
    direction: 'desc',
  });

  // Creates a new object containing just the associated MCL translations
  const columnMapping = requestsFormatter.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: item.translation }),
    {}
  );

  // Creates a new object containg only the associated formats of the required data
  const formatter = requestsFormatter.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: item.format }),
    {}
  );

  const sortedRequests = getSortedItems(requests, sortFormatter, sortedColumn);

  const renderBadge = () => {
    return requests ? <Badge>{requests?.length}</Badge> : <Badge>0</Badge>;
  };

  const onHeaderClick = (_e, meta) => {
    if (sortedColumn.column !== meta.name) {
      setSortedColumn({
        column: meta.name,
        direction: 'desc',
      });
    } else {
      setSortedColumn({
        column: sortedColumn.column,
        direction: sortedColumn.direction === 'desc' ? 'asc' : 'desc',
      });
    }
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      label={<FormattedMessage id="ui-oa.party.requests" />}
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={columnMapping}
            contentData={sortedRequests}
            formatter={formatter}
            onHeaderClick={onHeaderClick}
            sortDirection={`${sortedColumn.direction}ending`}
            sortedColumn={sortedColumn.column}
            visibleColumns={requestsFormatter.map((e) => e.name)}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

RelatedRequests.propTypes = propTypes;

export default RelatedRequests;
