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

  const { mutateAsync: putJournal } = useMutation(
    ['ui-oa', 'JournalEditRoute', 'putJournal'],
    (data) => ky.put(`oa/works/${id}`, { json: data }).then(() => {
        handleClose();
      })
  );
  const submitJournal = async (values) => {
    const { ...submitValues } = { ...values };
    if (values?.oaStatus?.id) {
      submitValues.oaStatus = values.oaStatus;
    } else {
      submitValues.oaStatus = null;
    }
    if (values?.indexedInDOAJ?.id) {
      submitValues.indexedInDOAJ = values.indexedInDOAJ;
    } else {
      submitValues.indexedInDOAJ = null;
    }
    await putJournal(submitValues);
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
            isLoading={isLoading}
            journal={journal}
          />
        </form>
      )}
    </Form>
  );
};

export default JournalEditRoute;
