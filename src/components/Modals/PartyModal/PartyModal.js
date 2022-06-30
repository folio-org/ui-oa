import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy, CalloutContext } from '@folio/stripes/core';
import { FormModal } from '@k-int/stripes-kint-components';
import { MessageBanner } from '@folio/stripes/components';

import { PartyInfoForm } from '../../PartyFormSections';
import getPartyErrorMessage from '../../../util/getPartyErrorMessage';
import { PARTIES_ENDPOINT } from '../../../constants/endpoints';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handlePartyChange: PropTypes.func,
};

const PartyModal = ({ showModal, setShowModal, handlePartyChange }) => {
  const [errors, setErrors] = useState();
  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);

  const handleClose = () => {
    setShowModal(false);
    setErrors();
  };

  const { mutateAsync: postParty } = useMutation(
    ['ui-oa', 'PartyModal', 'postParty'],
    (data) => ky.post(PARTIES_ENDPOINT, { json: data }).json()
  );

  const submitParty = async (values, form) => {
    await postParty(values)
      .then((res) => {
        handlePartyChange(res);
        const createdParty =
          (res.title ? res.title + ' ' : '') +
          res?.givenNames +
          ' ' +
          res?.familyName;
        callout.sendCallout({
          message: (
            <FormattedMessage
              id="ui-oa.party.creationSuccessCallout"
              values={{ createdParty }}
            />
          ),
          type: 'success',
        });
        handleClose();
        form.restart();
      })
      .catch((err) => {
        err.response.json().then((text) => {
          if (text.total) {
            setErrors(text?._embedded?.errors.map((e) => e?.message));
          } else {
            setErrors([text?.message]);
          }
        });
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
      {errors?.map((e) => (
        <MessageBanner dismissable show={errors} type="error">
          {getPartyErrorMessage(e)}
        </MessageBanner>
      ))}
    </FormModal>
  );
};

PartyModal.propTypes = propTypes;

export default PartyModal;
