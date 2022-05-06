import { useState } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Accordion,
  Badge,
  Col,
  MultiColumnList,
  Row,
  FormattedUTCDate,
} from '@folio/stripes/components';

import urls from '../../../util/urls';
import getSortedItems from '../../../util/getSortedItems';

const propTypes = {
  requests: PropTypes.object,
};

const RelatedRequests = ({ requests }) => {
  const [sortedColumn, setSortedColumn] = useState({
    column: 'requestDate',
    direction: 'desc',
  });

  const sortFormatter = {
    requestStatus: 'requestStatus.label',
  };

  const sortedRequests = getSortedItems(requests, sortFormatter, sortedColumn);

  const renderBadge = () => {
    return requests ? <Badge>{requests?.length}</Badge> : <Badge>0</Badge>;
  };

  const formatter = {
    requestNumber: (d) => (
      <Link to={urls.publicationRequest(d?.id)}>
        {d?.requestNumber}
      </Link>
    ),
    requestStatus: (d) => d?.requestStatus?.label,
    requestDate: (d) => (d?.requestDate ? <FormattedUTCDate value={d.requestDate} /> : ''),
    publicationTitle: (d) => d?.publicationTitle,
  };

  const onHeaderClick = (_e, meta) => {
    if (sortedColumn.column !== meta.name) {
      setSortedColumn({
        column: meta.name,
        direction:
          'desc'
      });
    } else {
      setSortedColumn({
        column: sortedColumn.column,
        direction:
          sortedColumn.direction === 'desc' ? 'asc' : 'desc',
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
            columnMapping={{
              requestNumber: (
                <FormattedMessage id="ui-oa.publicationRequest.requestNumber" />
              ),
              requestDate: (
                <FormattedMessage id="ui-oa.publicationRequest.requestDate" />
              ),
              requestStatus: (
                <FormattedMessage id="ui-oa.publicationRequest.status" />
              ),
              publicationTitle: (
                <FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />
              ),
            }}
            contentData={sortedRequests}
            formatter={formatter}
            onHeaderClick={onHeaderClick}
            sortDirection={`${sortedColumn.direction}ending`}
            sortedColumn={sortedColumn.column}
            visibleColumns={[
              'requestNumber',
              'requestDate',
              'requestStatus',
              'publicationTitle',
            ]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

RelatedRequests.propTypes = propTypes;

export default RelatedRequests;
