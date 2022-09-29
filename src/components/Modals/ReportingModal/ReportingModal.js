import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';

import { Button, ModalFooter } from '@folio/stripes/components';
import { FormModal } from '@k-int/stripes-kint-components';

const ReportingModal = ({ showModal, setShowModal }) => {
  const handleClose = () => setShowModal(false);

  const submitReport = (values) => {
    console.log(values);
  };

  const renderFooter = () => {
    return (
      <>
        <ModalFooter>
          <Button
            buttonStyle="primary"
            id="clickable-run-and download-report"
            marginBottom0
            onClick={() => setShowModal(false)}
          >
            <FormattedMessage id="ui-oa.publicationRequest.runReportAndDownload" />
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
      modalProps={{
        footer: renderFooter,
        onClose: handleClose,
        open: showModal,
        label: (
          <FormattedMessage id="ui-oa.publicationRequest.runOpenAPCChargesReport" />
        ),
      }}
      mutators={arrayMutators}
      onSubmit={submitReport}
    >
      <></>
    </FormModal>
  );
};

ReportingModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.bool,
};

export default ReportingModal;
