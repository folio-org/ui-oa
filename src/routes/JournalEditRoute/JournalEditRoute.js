import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { LoadingView } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';

import JournalForm from '../../components/views/JournalForm';
import urls from '../../util/urls';
import { WORK_ENDPOINT } from '../../constants/endpoints';

const JournalEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleClose = () => {
    history.push(urls.journal(id));
  };

  const { data: journal, isLoading } = useQuery([id], () => ky(WORK_ENDPOINT(id)).json());

  const { mutateAsync: putJournal } = useMutation(
    ['ui-oa', 'JournalEditRoute', 'putJournal'],
    (data) => {
      ky.put(WORK_ENDPOINT(id), { json: data }).then(() => {
        queryClient.invalidateQueries(id);
        handleClose();
      });
    }
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

  if (isLoading) {
    return <LoadingView dismissible onClose={handleClose} />;
  }

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
          />
        </form>
      )}
    </Form>
  );
};

export default JournalEditRoute;
