import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';

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
  const [contentExpanded, setContentExpanded] = useState({});

  const handleRowClick = (e, correspondence) => {
    history.push(`${urls.publicationRequestCorrespondenceView(request?.id, correspondence?.id)}`);
  };

  const handleEditClick = (e, correspondence) => {
    e.stopPropagation();
    history.push(`${urls.publicationRequestCorrespondenceEdit(request?.id, correspondence?.id)}`);
  };

  const handleShowMoreClick = (e, id) => {
    e.stopPropagation();
    setContentExpanded({ ...contentExpanded, [id]: !contentExpanded[id] });
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
              to={`${urls.publicationRequestCorrespondenceCreate(request?.id)}`}
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

  const renderShowMoreButton = (id) => {
    return (
      <button
        className={css.CorrespondenceExpandButton}
        onClick={(e) => handleShowMoreClick(e, id)}
        type="button"
      >
        {contentExpanded[id]
        ? <FormattedMessage id="ui-oa.correspondence.showLess" />
        : <FormattedMessage id="ui-oa.correspondence.showMore" />
        }
      </button>
    );
  };

  const formatter = {
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
          <div>
            <div>
              {contentExpanded[e?.id] ? e?.content : e?.content.substring(0, 255)}
            </div>
            <strong><FormattedMessage id="ui-oa.correspondence.mode" />: </strong>
            {e?.mode?.label}
          </div>
          <div>
            {e?.content.length > 255 && renderShowMoreButton(e?.id)}
            {renderEditButton(e)}
          </div>
        </div>
      );
    }
  };

  const getCellClass = (mclCellStyle) => {
    return classnames([css.CorrespondenceMCLCell, mclCellStyle]);
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
              dateOfCorrespondence: <FormattedMessage id="ui-oa.correspondence.dateOfCorrespondence" />,
              content: <FormattedMessage id="ui-oa.correspondence.descriptionAndMode" />,
              correspondent: <FormattedMessage id="ui-oa.correspondence.correspondent" />,
              status: <FormattedMessage id="ui-oa.correspondence.status" />,
              category: <FormattedMessage id="ui-oa.correspondence.category" />
            }}
            contentData={request?.correspondences}
            formatter={formatter}
            getCellClass={getCellClass}
            interactive
            onRowClick={handleRowClick}
            visibleColumns={['dateOfCorrespondence', 'content', 'correspondent', 'status', 'category']}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

Correspondence.propTypes = propTypes;

export default Correspondence;
