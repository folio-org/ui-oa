import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation } from 'react-query';

import { FormattedMessage } from 'react-intl';
import { Button, Modal } from '@folio/stripes/components';

import PartyInfoForm from '../PartyFormSections/PartyInfoForm/PartyInfoForm';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

const PartyModal = ({ showModal, setShowModal }) => {
  const ky = useOkapiKy();

  const handleClose = () => {
    setShowModal(false);
  };

  const { mutateAsync: postParty } = useMutation(
    ['ui-oa', 'PartyModal', 'postParty'],
    (data) => ky.post('oa/party', { json: data }).json().then(() => {
        handleClose();
      })
  );
  const submitParty = () => {
    postParty();
  };
  const renderModalFooter = (
    <>
      <Button
        buttonStyle="primary"
        id="duplicate-modal-save-button"
        onClick={submitParty}
        type="submit"
      >
        <FormattedMessage id="stripes-components.saveAndClose" />
      </Button>
      <Button
        buttonStyle="default"
        id="duplicate-modal-cancel-button"
        onClick={() => setShowModal(false)}
      >
        <FormattedMessage id="stripes-components.cancel" />
      </Button>
    </>
  );

  return (
    <Modal
      dismissible
      footer={renderModalFooter}
      label="ui-oa.publicationRequest.createPerson"
      onClose={() => setShowModal(false)}
      open={showModal}
    >
      <Form onSubmit={submitParty}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <PartyInfoForm />
          </form>
        )}
      </Form>
    </Modal>
  );
};

PartyModal.propTypes = propTypes;

export default PartyModal;
