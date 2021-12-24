import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { IfPermission } from '@folio/stripes/core';
import {
  Accordion,
  Badge,
  Button,
  Row,
  Col,
  MultiColumnList
} from '@folio/stripes/components';
import urls from '../../../util/urls';

const propTypes = {
  request: PropTypes.object
};

const renderBadge = (correspondences) => {
  return correspondences ?
    <Badge>{correspondences?.length}</Badge> :
    <Badge>0</Badge>;
};

const renderAddCorrespondenceButton = (request) => {
    return (
      <>
        <IfPermission perm="oa.publicationRequest.edit">
          <Button
            id="add-correspondence-button"
            to={`${urls.publicationRequestCorrespondenceCreate(request.id)}`}
          >
            <FormattedMessage id="ui-oa.publicationRequest.addCorrespondence" />
          </Button>
        </IfPermission>
      </>
    );
  };

const Correspondence = ({ request }) => {
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.correspondences)}
      displayWhenOpen={renderAddCorrespondenceButton(request)}
      label={<FormattedMessage id="ui-oa.publicationRequest.correspondence" />}
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              correspondent: <FormattedMessage id="ui-oa.correspondence.correspondent" />,
              dateOfCorrespondence: <FormattedMessage id="ui-oa.correspondence.dateOfCorrespondence" />,
              status: <FormattedMessage id="ui-oa.correspondence.status" />,
              mode: <FormattedMessage id="ui-oa.correspondence.mode" />,
              category: <FormattedMessage id="ui-oa.correspondence.category" />,
              description: <FormattedMessage id="ui-oa.correspondence.description" />
            }}
            contentData={request?.correspondences}
            visibleColumns={['correspondent', 'dateOfCorrespondence', 'status', 'mode', 'category', 'description']}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

Correspondence.propTypes = propTypes;

export default Correspondence;
