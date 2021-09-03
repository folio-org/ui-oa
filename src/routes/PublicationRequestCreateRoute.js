import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation, useQuery } from 'react-query';
import View from '../views/publicationRequestCreate';

const PublicationRequestCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();

  // TODO: Change all of the refdatavalues work to use useRefData()

  const { data: requestStatusValues } = useQuery(
    ['ui-oa', 'PublicationRequestCreateRoute', 'getRefValues', ''],
    () => ky('oa/refdata/PublicationRequest/RequestStatus').json()
  );

  const { mutateAsync: postPublicationRequest } = useMutation(
    ['ui-oa', 'PublicationRequestCreateRoute', 'postPublicationRequest'],
    (data) => ky.post('oa/publicationRequest', { json: data })
  );

  const doTheSubmit = (values) => {
    postPublicationRequest(values);
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
            refValues={requestStatusValues || []}
          />
        </form>
      )}
    </Form>
  );
};

export default PublicationRequestCreateRoute;
