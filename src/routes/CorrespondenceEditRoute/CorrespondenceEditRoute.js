import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import CorrespondenceForm from '../../components/views/CorrespondenceForm';

const CorrespondenceEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, cId } = useParams();

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${prId}`);
  };

  const { data: correspondence, isLoading } = useQuery(
    ['ui-oa', 'CorrespondenceEditRoute', 'correspondence', cId],
    () => ky(`oa/correspondence/${cId}`).json()
  );

  const { mutateAsync: putCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceEditRoute', 'putCorrespondence'],
    (data) => ky.put(`oa/correspondence/${cId}`, { json: data }).then(() => {
        handleClose();
      })
  );
  const submitCorrespondence = (values) => {
    putCorrespondence(values);
  };

  return (
    <Form
      initialValues={correspondence}
      mutators={arrayMutators}
      onSubmit={submitCorrespondence}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CorrespondenceForm
            correspondence={correspondence}
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
            isLoading={isLoading}
          />
        </form>
      )}
    </Form>
  );
};

export default CorrespondenceEditRoute;
