import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { Loading, Layout } from '@folio/stripes/components';
import { FormModal } from '@k-int/stripes-kint-components';

import JournalInfoForm from '../../JournalFormSections/JournalInfoForm';
import css from './JournalModal.css';

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

  const { mutateAsync: postJournal, isLoading } = useMutation(
    ['ui-oa', 'JournalModal', 'postJournal'],
    (data) => ky.post('oa/works/citation', { json: data }).json()
  );

  const submitJournal = (values, form) => {
    const submitValues = { ...values, type: 'serial' };
    postJournal(submitValues).then((res) => {
      handleJournalChange(res);
      handleClose();
      form.restart();
    });
  };

  return (
    <FormModal
      // Setting initial values of type to serial instead of select field
      initialValues={{
        title: '',
        instances: [{ ids: [{ ns: '', id: '' }], subType: '' }],
      }}
      modalProps={{
        onClose: handleClose,
        open: showModal,
        label: <FormattedMessage id="ui-oa.journal.newJournal" />,
      }}
      mutators={arrayMutators}
      onSubmit={submitJournal}
    >
      {isLoading ? (
        <Layout className={css.spinnerStyle}>
          <Loading size="large" />
        </Layout>
      ) : (
        <JournalInfoForm />
      )}
    </FormModal>
  );
};

JournalModal.propTypes = propTypes;

export default JournalModal;
