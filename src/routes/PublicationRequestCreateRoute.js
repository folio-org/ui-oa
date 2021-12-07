import { useContext } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';

import { useOkapiKy, CalloutContext } from '@folio/stripes/core';
import SafeHTMLMessage from '@folio/react-intl-safe-html';

import PublicationRequestForm from '../components/views/PublicationRequestForm';
import publicationRequestSubmitHandler from '../util/publicationRequestSubmitHandler';

const PublicationRequestCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);


  const handleClose = (id) => {
    let path = '/oa/publicationRequests';
    if (id) path += `/${id}`;
    history.push(path);
  };

  const { mutateAsync: postPublicationRequest } = useMutation(
    ['ui-oa', 'PublicationRequestCreateRoute', 'postPublicationRequest'],
    (data) => ky.post('oa/publicationRequest', { json: data }).json().then(res => {
      const requestNumber = res.requestNumber;
      callout.sendCallout({ message: <SafeHTMLMessage id="ui-oa.publicationRequest.success.callout" values={{ requestNumber }} /> });
      handleClose(res.id);
    })
  );

  const submitRequest = (values) => {
    const submitValues = publicationRequestSubmitHandler(values);
    postPublicationRequest(submitValues);
  };

  return (
    <Form
      mutators={arrayMutators}
      onSubmit={submitRequest}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <PublicationRequestForm
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
