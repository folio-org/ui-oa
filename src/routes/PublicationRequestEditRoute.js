import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';
import View from '../views/PublicationRequestCreate';

const PublicationRequestEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { id } = useParams();

  const { data: publicationRequest } = useQuery(
    ['ui-oa', 'publicationEditRoute', 'publicationRequest', id],
    () => ky(`oa/publicationRequest/${id}`).json()
  );

  const { mutateAsync: putPublicationRequest } = useMutation(
    ['ui-oa', 'PublicationRequestEditRoute', 'putPublicationRequest'],
    (data) => ky.put('oa/publicationRequest', { json: data })
  );

  const handleClose = () => {
    history.push('/oa/publicationRequests');
  };

  const submitRequest = (values) => {
    putPublicationRequest(values);
    handleClose();
  };

  return (
    <Form
      initialValues={publicationRequest}
      mutators={arrayMutators}
      onSubmit={submitRequest}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <View
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit
            }}
            publicationRequest={publicationRequest}
          />
        </form>
      )}
    </Form>
  );
};

export default PublicationRequestEditRoute;
