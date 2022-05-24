import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import JournalForm from '../../components/views/JournalForm';

const JournalEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { id } = useParams();

  const handleClose = () => {
    history.push(`/oa/journals/${id}`);
  };

  const { data: journal, isLoading } = useQuery(
    ['ui-oa', 'JournalEditRoute', 'journal', id],
    () => ky(`oa/works/${id}`).json()
  );

  const { mutateAsync: putJournal, isLoading: isSubmitting } = useMutation(
    ['ui-oa', 'JournalEditRoute', 'putJournal'],
    (data) => ky.put(`oa/works/${id}`, { json: data }).then(() => {
        handleClose();
      })
  );
  const submitJournal = (values) => {
    const { oaStatus, indexedInDOAJ, ...submitValues } = { ...values };
    if (!oaStatus?.id) {
      submitValues.oaStatus = null;
    }
    if (!indexedInDOAJ?.id) {
      submitValues.indexedInDOAJ = null;
    }
    putJournal(submitValues);
  };

  return (
    <Form
      initialValues={journal}
      mutators={arrayMutators}
      onSubmit={submitJournal}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <JournalForm
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
            journal={journal}
            queryStates={{
              isSubmitting,
              isLoading,
            }}
          />
        </form>
      )}
    </Form>
  );
};

export default JournalEditRoute;
