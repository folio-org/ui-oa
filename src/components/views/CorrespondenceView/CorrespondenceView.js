import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Pane,
  Paneset,
  PaneMenu,
  IconButton,
  Row,
  Col,
  KeyValue,
  Button,
  Icon,
  ConfirmationModal,
} from '@folio/stripes/components';
import { AppIcon, IfPermission } from '@folio/stripes/core';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  correspondence: PropTypes.object,
};

const CorrespondenceView = ({ onClose, onDelete, onEdit, correspondence }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const openDeleteConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const getActionMenu = () => {
    return (
      <>
        <IfPermission perm="oa.correspondence.edit">
          <Button
            buttonStyle="dropdownItem"
            id="correspondence-edit-button"
            onClick={onEdit}
          >
            <Icon icon="edit">
              <FormattedMessage id="ui-oa.correspondence.edit" />
            </Icon>
          </Button>
        </IfPermission>
        <IfPermission perm="oa.correspondence.manage">
          <Button
            buttonStyle="dropdownItem"
            id="correspondence-delete-button"
            onClick={openDeleteConfirmationModal}
          >
            <Icon icon="trash">
              <FormattedMessage id="ui-oa.correspondence.delete" />
            </Icon>
          </Button>
        </IfPermission>
      </>
    );
  };
  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-oa.publicationRequest.closeForm">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-correspondence-view-button"
              onClick={() => onClose()}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  return (
    <Paneset>
      <Pane
        actionMenu={getActionMenu}
        appIcon={<AppIcon app="oa" />}
        centerContent
        defaultWidth="100%"
        firstMenu={renderFirstMenu()}
        id="pane.oa.correspondence.view"
        paneTitle={
          <FormattedMessage id="ui-oa.correspondence.viewCorrespondence" />
        }
      >
        <ConfirmationModal
          confirmLabel={<FormattedMessage id="ui-oa.correspondence.delete" />}
          heading={
            <FormattedMessage id="ui-oa.correspondence.deleteCorrespondence" />
          }
          message={
            <FormattedMessage id="ui-oa.correspondence.deleteCorrespondenceMessage" />
          }
          onCancel={closeDeleteConfirmationModal}
          onConfirm={() => onDelete()}
          open={showConfirmationModal}
        />
        <Row>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-oa.correspondence.correspondent" />
              }
              value={correspondence?.correspondent}
            />
          </Col>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-oa.correspondence.dateOfCorrespondence" />
              }
              value={correspondence?.dateOfCorrespondence}
            />
          </Col>
          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-oa.correspondence.status" />}
              value={correspondence?.status?.label}
            />
          </Col>
          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-oa.correspondence.mode" />}
              value={correspondence?.mode?.label}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-oa.correspondence.category" />}
              value={correspondence?.category?.label}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-oa.correspondence.description" />}
              value={correspondence?.content}
            />
          </Col>
        </Row>
      </Pane>
    </Paneset>
  );
};

CorrespondenceView.propTypes = propTypes;

export default CorrespondenceView;
