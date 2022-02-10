import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';

import { Button, Modal, ModalFooter } from '@folio/stripes/components';

import JournalInfoForm from '../JournalFormSections/JournalInfoForm';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

const JournalModal = ({ showModal, setShowModal }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  const postJournal = () => {
    // TODO Can be changed to post when controller is implemented
    handleClose();
  };

  const renderModalFooter = (handleSubmit, formRestart) => {
    return (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          id="journal-modal-save-button"
          onClick={() => {
            handleSubmit().then(formRestart);
          }}
          type="submit"
        >
          <FormattedMessage id="stripes-components.saveAndClose" />
        </Button>
        <Button
          buttonStyle="default"
          id="journal-modal-cancel-button"
          onClick={() => setShowModal(false)}
        >
          <FormattedMessage id="stripes-components.cancel" />
        </Button>
      </ModalFooter>
    );
  };

  return (
    <Form
      mutators={arrayMutators}
      onSubmit={postJournal}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <Modal
            dismissible
            footer={renderModalFooter(handleSubmit, form.restart)}
            label={<FormattedMessage id="ui-oa.journal.newJournal" />}
            onClose={() => setShowModal(false)}
            open={showModal}
          >
            <JournalInfoForm />
          </Modal>
        </form>
      )}
    />
  );
};

JournalModal.propTypes = propTypes;

export default JournalModal;
