import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation } from 'react-query';
import View from '../views/PublicationRequestCreate';

const PublicationRequestCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();

  const { mutateAsync: postPublicationRequest } = useMutation(
    ['ui-oa', 'PublicationRequestCreateRoute', 'postPublicationRequest'],
    (data) => ky.post('oa/publicationRequest', { json: data })
  );

  const doTheSubmit = (values) => {
    postPublicationRequest(values);
    // console.log(values)
    history.push('/oa/publicationRequests');
  };

  const handleClose = () => {
    history.push('/oa/publicationRequests');
  };

  return (
    <Form
      mutators={arrayMutators}
      onSubmit={doTheSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <View
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit
            }}
          />
        </form>
      )}
    </Form>
  );
};

export default PublicationRequestCreateRoute;
