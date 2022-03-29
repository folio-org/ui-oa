import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { Button, Modal, ModalFooter } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';

import { PartyInfoForm } from '../../PartyFormSections';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handlePartyChange: PropTypes.func,
};

const PartyModal = ({ showModal, setShowModal, handlePartyChange }) => {
  const ky = useOkapiKy();

  const handleClose = () => {
    setShowModal(false);
  };

  const { mutateAsync: postParty } = useMutation(
    ['ui-oa', 'PartyModal', 'postParty'],
    (data) => ky.post('oa/party', { json: data }).json().then((res) => {
        handlePartyChange(res);
        handleClose();
      })
  );

  const renderModalFooter = (handleSubmit, formRestart) => {
    return (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          id="party-modal-save-button"
          onClick={() => {
            handleSubmit().then(formRestart);
          }}
          type="submit"
        >
          <FormattedMessage id="stripes-components.saveAndClose" />
        </Button>
        <Button
          buttonStyle="default"
          id="party-modal-cancel-button"
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
      onSubmit={postParty}
      render={({ handleSubmit, form: { restart: formRestart } }) => (
        <form onSubmit={handleSubmit}>
          <Modal
            dismissible
            footer={renderModalFooter(handleSubmit, formRestart)}
            label={<FormattedMessage id="ui-oa.party.newPerson" />}
            onClose={() => setShowModal(false)}
            open={showModal}
          >
            <PartyInfoForm />
          </Modal>
        </form>
      )}
    />
  );
};

PartyModal.propTypes = propTypes;

export default PartyModal;
