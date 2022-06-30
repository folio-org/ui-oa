import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { useMutation } from 'react-query';

import { useOkapiKy, CalloutContext } from '@folio/stripes/core';
import { MessageBanner } from '@folio/stripes/components';
import { FormModal } from '@k-int/stripes-kint-components';

import JournalInfoForm from '../../JournalFormSections/JournalInfoForm';
import { WORK_CITATION_ENDPOINT } from '../../../constants/endpoints';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleJournalChange: PropTypes.func,
};

const JournalModal = ({ showModal, setShowModal, handleJournalChange }) => {
  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);
  const [savedValues, setSavedValues] = useState();

  const handleClose = () => {
    setShowModal(false);
    setSavedValues();
  };

  const { mutateAsync: postJournal, isError } = useMutation(
    ['ui-oa', 'JournalModal', 'postJournal'],
    (data) => ky.post(WORK_CITATION_ENDPOINT, { json: data }).json()
  );

  const submitJournal = async (values, form) => {
    const submitValues = { ...values, type: 'serial' };
    // Due to stranged nested field array interation, form values need to be saved
    // Saved values are then used as the initial values for the form upon error
    setSavedValues(submitValues);
    await postJournal(submitValues).then((res) => {
      handleJournalChange(res);
      callout.sendCallout({
        message: (
          <FormattedMessage
            id="ui-oa.journal.creationSuccess"
            values={{ journalTitle: res?.title }}
          />
        ),
        type: 'success',
      });
      handleClose();
      // Saved values then cleared upon successful submission
      setSavedValues();
      form.restart();
    });
  };

  return (
    <FormModal
      // Setting initial values of type to serial instead of select field
      initialValues={
        savedValues || {
          title: '',
          instances: [{ ids: [{ ns: '', id: '' }], subType: '' }],
        }
      }
      modalProps={{
        onClose: handleClose,
        open: showModal,
        label: <FormattedMessage id="ui-oa.journal.newJournal" />,
      }}
      mutators={arrayMutators}
      onSubmit={submitJournal}
    >
      <JournalInfoForm />
      {/* Saved values conditional used as isError persists when modal is closed */}
      {savedValues && (
        <MessageBanner dismissable show={isError} type="error">
          <FormattedMessage id="ui-oa.journal.creationError" />
        </MessageBanner>
      )}
    </FormModal>
  );
};

JournalModal.propTypes = propTypes;

export default JournalModal;
