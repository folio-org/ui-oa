import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AppIcon, useOkapiKy } from '@folio/stripes/core';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';

import {
  Pane,
  Row,
  Col,
  KeyValue,
  Headline,
  Button,
  Icon,
  ConfirmationModal,
} from '@folio/stripes/components';

import urls from '../../../util/urls';
import useOARefdata from '../../../util/useOARefdata';

const propTypes = {
  charge: PropTypes.object,
  request: PropTypes.object,
  refetch: PropTypes.func
};

const ChargeView = ({ charge, request, refetch }) => {
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showUnlinkConfirmModal, setShowUnlinkConfirmModal] = useState(false);


  const ky = useOkapiKy();
  const history = useHistory();

  const expectedStatusRefData = useOARefdata('Charge.ChargeStatus').find(e => e.value === 'expected');

  const handleClose = () => {
    refetch();
    history.push(urls.publicationRequest(request?.id));
  };

  const { mutateAsync: deleteCharge } = useMutation(
    ['ui-oa', 'ChargeView', 'deleteCharge'],
    (data) => ky.put(`oa/publicationRequest/${request?.id}`, { json: data }).then(() => {
        handleClose();
      })
  );

  const { mutateAsync: unlinkInvoice } = useMutation(
    ['ui-oa', 'ChargeView', 'unlinkInvoice'],
    (data) => ky.put(`oa/publicationRequest/${request?.id}`, { json: data }).then(() => {
        refetch();
        setShowUnlinkConfirmModal(false);
      })
  );

  const handleEdit = () => {
    history.push(urls.publicationRequestChargeEdit(request?.id, charge?.id));
  };

  const handleDelete = () => {
    deleteCharge({
      charges: [{ ...charge, _delete: true }],
    });
  };

  const handleLink = () => {
    history.push(
      `${urls.publicationRequestChargeLinkInvoice(request.id, charge.id)}`
    );
  };

  const handleUnlink = () => {
    const submitValues = {
      charges: [
        {
          ...charge,
          invoiceReference: null,
          invoiceLineItemReference: null,
          chargeStatus: expectedStatusRefData,
        },
      ],
    };
    unlinkInvoice(submitValues);
  };

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
    <Pane
      actionMenu={renderActionMenu}
      appIcon={<AppIcon app="oa" iconKey="app" size="small" />}
      defaultWidth="55%"
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
        message={<FormattedMessage id="ui-oa.charge.invoice.unlinkInvoiceMessage" />}
        onCancel={() => setShowUnlinkConfirmModal(false)}
        onConfirm={() => handleUnlink()}
        open={showUnlinkConfirmModal}
      />
      <Headline margin="large" size="x-large" tag="h2">
        <FormattedMessage id="ui-oa.charge.chargeInformation" />
      </Headline>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.publicationRequest" />}
            value={
              request?.publicationTitle
                ? request?.requestNumber + ' : ' + request?.publicationTitle
                : request.requestNumber
            }
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.category" />}
            value={charge?.category?.label}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.status" />}
            value={charge?.chargeStatus?.label}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.payer" />}
            value={charge?.payer?.label}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.payerNote" />}
            value={charge?.payerNote}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.amount" />}
            value={charge?.amount?.value}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.currency" />}
            value={charge?.exchangeRate?.toCurrency}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.exchangeRate" />}
            value={charge?.exchangeRate?.coefficient}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.discount" />}
            value={
              charge?.discountType?.value === 'percentage'
                ? charge?.discount + '%'
                : charge?.discount
            }
          />
        </Col>
        <Col xs={9}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.discountNote" />}
            value={charge?.discountNote}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.tax" />}
            value={charge?.tax ? charge?.tax + '%' : null}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.description" />}
            value={charge?.description}
          />
        </Col>
      </Row>
    </Pane>
  );
};

ChargeView.propTypes = propTypes;

export default ChargeView;
