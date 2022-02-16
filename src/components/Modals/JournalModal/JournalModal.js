import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { Button, Modal, ModalFooter } from '@folio/stripes/components';

import JournalInfoForm from '../../JournalFormSections/JournalInfoForm';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleJournalChange: PropTypes.func,
};

const JournalModal = ({ showModal, setShowModal, handleJournalChange }) => {
  const ky = useOkapiKy();

  const handleClose = () => {
    setShowModal(false);
  };

  const { mutateAsync: postJournal } = useMutation(
    ['ui-oa', 'JournalModal', 'postJournal'],
    (data) => ky.post('oa/works/citation', { json: data }).json().then((res) => {
      handleJournalChange(res);
      handleClose();
    })
  );

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
      // Setting initial values of type to serial instead of select field
      initialValues={{
        title: '',
        type: 'serial',
        instances: [{ ids: [{ ns: '', id: '' }], subType: '' }],
      }}
      mutators={arrayMutators}
      onSubmit={postJournal}
      render={({ handleSubmit, form: { restart: formRestart } }) => (
        <form onSubmit={handleSubmit}>
          <Modal
            dismissible
            footer={renderModalFooter(handleSubmit, formRestart)}
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
