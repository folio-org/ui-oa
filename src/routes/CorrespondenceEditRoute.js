import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation, useQuery } from 'react-query';
import CorrespondenceForm from '../components/views/CorrespondenceForm';

const CorrespondenceEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { id } = useParams();

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${id}`);
  };

  const { data: correspondence } = useQuery(
    ['ui-oa', 'CorrespondenceEditRoute', 'correspondence', id],
    () => ky(`oa/correspondence/${id}`).json()
  );

  const { mutateAsync: putCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceEditRoute', 'putCorrespondence'],
    (data) => ky.put('oa/correspondence', { json: data }).json().then(() => {
        handleClose();
      })
  );
  const submitCorrespondence = (values) => {
    const submitValues = { ...values, 'owner':{ id } };
    putCorrespondence(submitValues);
  };

  return (
    <Form mutators={arrayMutators} onSubmit={submitCorrespondence}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CorrespondenceForm
            correspondence={correspondence}
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
          />
        </form>
      )}
    </Form>
  );
};

export default CorrespondenceEditRoute;
