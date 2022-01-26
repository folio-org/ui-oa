import PropTypes from 'prop-types';
import { Form, arrayMutators } from 'react-final-form';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { Button, Modal } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';

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

  const submitParty = (values) => {
    postParty(values);
  };

  const renderModalFooter = (handleSubmit) => {
    return (
      <>
        <Button
          buttonStyle="primary"
          id="duplicate-modal-save-button"
          onClick={handleSubmit}
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
  };

  return (
    <Form mutators={arrayMutators} onSubmit={submitParty}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Modal
            dismissible
            footer={renderModalFooter(handleSubmit)}
            label="ui-oa.publicationRequest.createPerson"
            onClose={() => setShowModal(false)}
            open={showModal}
          >
            <PartyInfoForm />
          </Modal>
        </form>
      )}
    </Form>
  );
};

PartyModal.propTypes = propTypes;

export default PartyModal;
