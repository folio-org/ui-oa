import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  MultiColumnList,
  Row,
  FormattedUTCDate
} from '@folio/stripes/components';

const propTypes = {
  requests: PropTypes.object,
  party: PropTypes.object,
};

const RelatedRequests = ({ requests, party }) => {
  const relatedRequests = requests?.filter(
    (request) => request?.correspondingAuthor?.partyOwner?.id === party?.id
  );

  const renderBadge = () => {
    return relatedRequests ? <Badge>{relatedRequests?.length}</Badge> : <Badge>0</Badge>;
  };

  const formatter = {
    requestNumber: (d) => d?.requestNumber,
    requestStatus: (d) => d?.requestStatus?.label,
    requestDate: (d) => (d.requestDate ? <FormattedUTCDate value={d.requestDate} /> : ''),
    correspondingAuthorName: (d) => (d.correspondingAuthor?.partyOwner?.fullName),
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
            contentData={relatedRequests}
            formatter={formatter}
            sortedColumn="requestDate"
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
