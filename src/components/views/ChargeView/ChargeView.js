import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';

import {
  Pane,
  Button,
  Icon,
  ConfirmationModal,
  HasCommand,
  checkScope,
} from '@folio/stripes/components';

import { ChargeInfo, PaymentSplit } from '../../ChargeSections';
import { useInvoice, useInvoiceLine } from '../../../hooks/invoiceHooks';
import { PANE_DEFAULT_WIDTH } from '../../../constants/config';
import ChargeInvoice from '../../ChargeSections/ChargeInvoice';

const propTypes = {
  charge: PropTypes.object,
  request: PropTypes.object,
  handlers: PropTypes.shape({
    handleClose: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleLink: PropTypes.func.isRequired,
    handleUnlink: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
  }).isRequired,
};

const ChargeView = ({
  charge,
  request,
  handlers: { handleClose, handleEdit, handleLink, handleUnlink, handleDelete },
}) => {
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showUnlinkConfirmModal, setShowUnlinkConfirmModal] = useState(false);

  const invoice = useInvoice(charge?.invoiceReference);
  const invoiceLine = useInvoiceLine(charge?.invoiceLineItemReference);

  const shortcuts = [
    {
      name: 'edit',
      handler: () => handleEdit(),
    },
  ];

  const renderActionMenu = () => {
    return (
      <>
        <Button
          buttonStyle="dropdownItem"
          id="charge-edit-button"
          onClick={handleEdit}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-oa.charge.edit" />
          </Icon>
        </Button>
        {!charge?.invoiceReference ? (
          <Button
            buttonStyle="dropdownItem"
            id="link-invoice-button"
            onClick={handleLink}
          >
            <Icon icon="link">
              <FormattedMessage id="ui-oa.charge.invoice.linkInvoice" />
            </Icon>
          </Button>
        ) : (
          <Button
            buttonStyle="dropdownItem"
            id="unlink-invoice-button"
            onClick={() => setShowUnlinkConfirmModal(true)}
          >
            <Icon icon="unlink">
              <FormattedMessage id="ui-oa.charge.invoice.unlinkInvoice" />
            </Icon>
          </Button>
        )}
        <Button
          buttonStyle="dropdownItem"
          id="charge-delete-button"
          onClick={() => setShowDeleteConfirmModal(true)}
        >
          <Icon icon="trash">
            <FormattedMessage id="ui-oa.charge.delete" />
          </Icon>
        </Button>
      </>
    );
  };

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Pane
        actionMenu={renderActionMenu}
        appIcon={<AppIcon app="oa" iconKey="app" size="small" />}
        defaultWidth={PANE_DEFAULT_WIDTH}
        dismissible
        onClose={handleClose}
        paneTitle={
          <FormattedMessage id="ui-oa.charge.publicationRequestCharge" />
        }
      >
        <ConfirmationModal
          confirmLabel={<FormattedMessage id="ui-oa.charge.delete" />}
          heading={<FormattedMessage id="ui-oa.charge.deleteCharge" />}
          message={<FormattedMessage id="ui-oa.charge.deleteChargeMessage" />}
          onCancel={() => setShowDeleteConfirmModal(false)}
          onConfirm={() => handleDelete()}
          open={showDeleteConfirmModal}
        />
        <ConfirmationModal
          confirmLabel={<FormattedMessage id="ui-oa.charge.invoice.unlink" />}
          heading={<FormattedMessage id="ui-oa.charge.invoice.unlinkInvoice" />}
          message={
            <FormattedMessage id="ui-oa.charge.invoice.unlinkInvoiceMessage" />
          }
          onCancel={() => setShowUnlinkConfirmModal(false)}
          onConfirm={() => {
            handleUnlink();
            setShowUnlinkConfirmModal(false);
          }}
          open={showUnlinkConfirmModal}
        />
        <ChargeInfo charge={charge} request={request} />
        {charge?.chargeStatus?.value === 'invoiced' && (
          <ChargeInvoice
            charge={charge}
            invoice={invoice}
            invoiceLine={invoiceLine}
          />
        )}
        <PaymentSplit charge={charge} />
      </Pane>
    </HasCommand>
  );
};

ChargeView.propTypes = propTypes;

export default ChargeView;
