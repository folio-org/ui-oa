import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';

import { Button, ModalFooter } from '@folio/stripes/components';
import { FormModal } from '@k-int/stripes-kint-components';

import ReportingInfoForm from '../../ReportingFormSections';
import { useOARefdata } from '../../../util';

const ReportingModal = ({ showModal, setShowModal }) => {
  // Change to institutionName when backend changes go through
  const institutionName = useOARefdata('Funding.Funder')[0];
  const handleClose = () => setShowModal(false);

  const submitReport = (values) => {
    console.log(values);
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
        institutionName,
        reportFormat: { value: 'openapc_apc', label: 'OpenAPC APC' },
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
      <ReportingInfoForm institutionName={institutionName} />
    </FormModal>
  );
};

ReportingModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.bool,
};

export default ReportingModal;
