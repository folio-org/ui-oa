import React from 'react';
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

const propTypes = {
  requests: PropTypes.object,
};

const RelatedRequests = ({ requests }) => {
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
    requestDate: (d) => (d.requestDate ? <FormattedUTCDate value={d.requestDate} /> : ''),
    correspondingAuthorName: (d) => d.correspondingAuthor?.partyOwner?.fullName,
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
            contentData={requests}
            formatter={formatter}
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
