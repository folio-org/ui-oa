import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Button, Modal } from '@folio/stripes/components';

import PartyInfoForm from '../PartyFormSections/PartyInfoForm/PartyInfoForm';

const propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
};

const PartyModal = ({ showModal, setShowModal }) => {
  const renderModalFooter = (
    <>
      <Button buttonStyle="primary" id="duplicate-modal-save-button">
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
    <>
      <Modal
        footer={renderModalFooter}
        label="ui-oa.publicationRequest.createPerson"
        onClose={() => setShowModal(false)}
        open={showModal}
      >
        <PartyInfoForm />
      </Modal>
    </>
  );
};

PartyModal.propTypes = propTypes;

export default PartyModal;
