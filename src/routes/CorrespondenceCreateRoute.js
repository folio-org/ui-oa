import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';
import CorrespondenceForm from '../components/views/CorrespondenceForm';

const CorrespondenceCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { publicationRequestId } = useParams();

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${publicationRequestId}`);
  };

  const { data: publicationRequest } = useQuery(
    ['ui-oa', 'correspondenceCreateRoute', 'publicationRequest', publicationRequestId],
    () => ky(`oa/publicationRequest/${publicationRequestId}`).json()
  );

  const { mutateAsync: postCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceCreateRoute', 'postCorrespondence'],
    (data) => ky.put('/oa/correspondence/', { json: data }).then(() => {
        handleClose();
      })
  );
  const submitRequest = (values) => {
    const submitValues = { ...values, 'owner':{ publicationRequest } };
    postCorrespondence(submitValues);
  };

  return (
    <Form mutators={arrayMutators} onSubmit={submitRequest}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CorrespondenceForm
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

export default CorrespondenceCreateRoute;
