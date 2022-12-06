import { useContext } from 'react';
import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';

import { Button, ModalFooter } from '@folio/stripes/components';
import { CalloutContext } from '@folio/stripes/core';
import {
  FormModal,
  generateKiwtQueryParams,
} from '@k-int/stripes-kint-components';

import ReportingInfoForm from '../../ReportingFormSections';
import { useOARefdata } from '../../../util';
import useGenerateReport from '../../../hooks/useGenerateReport';
import { REPORT_ENDPOINT } from '../../../constants/endpoints';

const ReportingModal = ({ showModal, setShowModal }) => {
  const generateReport = useGenerateReport();
  const callout = useContext(CalloutContext);
  const institutions = useOARefdata('InstitutionName');

  const handleClose = () => setShowModal(false);

  const downloadBlob = (blob, values) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${values.paymentPeriod ? values?.paymentPeriod + '_' : ''}${
      values?.institution
    }_${values?.reportFormat}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const submitReport = async (values, form) => {
    const chargeCategory = values?.chargeCategory
      ?.map((e) => e.value)
      ?.join(',');
    const chargeStatus = values?.chargeStatus?.map((e) => e.value)?.join(',');

    const paramMap = {
      institution: values?.institution,
      ...(!!values?.paymentPeriod && { paymentPeriod: values?.paymentPeriod }),
      ...(!!chargeCategory && { chargeCategory }),
      ...(!!chargeStatus && { chargeStatus }),
      ...(!!values?.agreementId && { agreementId: values?.agreementId }),
    };

    const queryParams = generateKiwtQueryParams(paramMap, {});

    const path = `${REPORT_ENDPOINT(values?.reportFormat)}?${queryParams.join(
      '&'
    )}`;

    await generateReport(path).then((res) => {
      res.blob().then((blob) => {
        callout.sendCallout({
          message: (
            <FormattedMessage
              id="ui-oa.report.reportCreated"
              values={{ reportFormat: values?.reportFormat }}
            />
          ),
          type: 'success',
        });
        downloadBlob(blob, values);
        handleClose();
        form.restart();
      });
    });
  };

  const renderFooter = ({ formState, handleSubmit }) => {
    const { invalid, pristine, submitting } = formState;
    return (
      <>
        <ModalFooter>
          <Button
            buttonStyle="primary"
            disabled={submitting || invalid || pristine}
            id="clickable-run-and download-report"
            marginBottom0
            onClick={handleSubmit}
          >
            <FormattedMessage id="ui-oa.report.runReportAndDownload" />
          </Button>
          <Button
            id="clickable-cancel-report"
            marginBottom0
            onClick={() => setShowModal(false)}
          >
            <FormattedMessage id="ui-oa.cancel" />
          </Button>
        </ModalFooter>
      </>
    );
  };

  return (
    <FormModal
      initialValues={{
        institution: institutions.length > 1 ? null : institutions[0]?.value,
      }}
      modalProps={{
        dismissible: true,
        footer: renderFooter,
        onClose: handleClose,
        open: showModal,
        label: <FormattedMessage id="ui-oa.report.runOpenAPCChargesReport" />,
      }}
      mutators={arrayMutators}
      onSubmit={submitReport}
    >
      <ReportingInfoForm />
    </FormModal>
  );
};

ReportingModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default ReportingModal;
