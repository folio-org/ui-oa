import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy } from '@folio/stripes/core';
import { FormModal } from '@k-int/stripes-kint-components';

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
    (data) => ky.post('oa/party', { json: data }).json()
  );

  const submitParty = (values, form) => {
    postParty(values).then((res) => {
      handlePartyChange(res);
      handleClose();
      form.restart();
    });
  };

  return (
    <FormModal
      modalProps={{
        onClose: handleClose,
        open: showModal,
        label: <FormattedMessage id="ui-oa.party.newPerson" />,
      }}
      mutators={arrayMutators}
      onSubmit={submitParty}
    >
      <PartyInfoForm />
    </FormModal>
  );
};

PartyModal.propTypes = propTypes;

export default PartyModal;
