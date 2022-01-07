import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { IfPermission } from '@folio/stripes/core';
import {
  Accordion,
  Badge,
  Button,
  Row,
  Col,
  MultiColumnList,
  FormattedUTCDate
} from '@folio/stripes/components';

import urls from '../../../util/urls';

import css from './Correspondence.css';

const propTypes = {
  request: PropTypes.object
};

const Correspondence = ({ request }) => {
  const history = useHistory();

  const handleRowClick = (e, correspondence) => {
    history.push(`${urls.publicationRequestCorrespondenceView(request?.id, correspondence?.id)}`);
  };

  const handleEditClick = (e, correspondence) => {
    e.stopPropagation();
    history.push(`${urls.publicationRequestCorrespondenceEdit(request?.id, correspondence?.id)}`);
  };

  const renderBadge = (correspondences) => {
    return correspondences ?
      <Badge>{correspondences?.length}</Badge> :
      <Badge>0</Badge>;
  };

  const renderAddCorrespondenceButton = () => {
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

  const renderEditButton = (correspondence) => {
    return (
      <IfPermission perm="oa.publicationRequest.edit">
        <button
          className={css.CorrespondenceEditButton}
          onClick={(e) => handleEditClick(e, correspondence)}
          type="button"
        >
          <FormattedMessage id="ui-oa.correspondence.edit" />
        </button>
      </IfPermission>
    );
  };

  const formatter = {
    mode: e => {
      return e?.mode?.label;
    },
    category: e => {
      return e?.category?.label;
    },
    status: e => {
      return e?.status?.label;
    },
    dateOfCorrespondence: e => {
      return <FormattedUTCDate value={e?.dateOfCorrespondence} />;
    },
    content: e => {
      return (
        <div>
          {e?.content}
          <div>
            {renderEditButton(e)}
          </div>
        </div>
      );
    }
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.correspondences)}
      displayWhenOpen={renderAddCorrespondenceButton()}
      label={<FormattedMessage id="ui-oa.publicationRequest.correspondence" />}
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            autoSize
            columnMapping={{
              correspondent: <FormattedMessage id="ui-oa.correspondence.correspondent" />,
              dateOfCorrespondence: <FormattedMessage id="ui-oa.correspondence.dateOfCorrespondence" />,
              status: <FormattedMessage id="ui-oa.correspondence.status" />,
              mode: <FormattedMessage id="ui-oa.correspondence.mode" />,
              category: <FormattedMessage id="ui-oa.correspondence.category" />,
              content: <FormattedMessage id="ui-oa.correspondence.description" />
            }}
            contentData={request?.correspondences}
            formatter={formatter}
            interactive
            onRowClick={handleRowClick}
            visibleColumns={['correspondent', 'dateOfCorrespondence', 'status', 'mode', 'category', 'content']}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

Correspondence.propTypes = propTypes;

export default Correspondence;
