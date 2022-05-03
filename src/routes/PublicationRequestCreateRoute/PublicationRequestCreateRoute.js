import { useContext } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy, CalloutContext } from '@folio/stripes/core';

import PublicationRequestForm from '../../components/views/PublicationRequestForm';
import publicationRequestSubmitHandler from '../../util/publicationRequestSubmitHandler';

const PublicationRequestCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);

  const handleClose = (id) => {
    let path = '/oa/publicationRequests';
    if (id) path += `/${id}`;
    history.push(path);
  };

  const { mutateAsync: postPublicationRequest, isLoading: isSubmitting } =
    useMutation(
      ['ui-oa', 'PublicationRequestCreateRoute', 'postPublicationRequest'],
      (data) => ky
          .post('oa/publicationRequest', { json: data })
          .json()
          .then((res) => {
            const requestNumber = res.requestNumber;
            callout.sendCallout({
              message: (
                <FormattedMessage
                  id="ui-oa.publicationRequest.success.callout"
                  values={{ requestNumber }}
                />
              ),
            });
            handleClose(res.id);
          })
    );

  const submitRequest = (values) => {
    const submitValues = publicationRequestSubmitHandler(values);
    postPublicationRequest(submitValues);
  };

  return (
    <Form mutators={arrayMutators} onSubmit={submitRequest}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <PublicationRequestForm
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
            queryStates={{
              isSubmitting,
            }}
          />
        </form>
      )}
    </Form>
  );
};

export default PublicationRequestCreateRoute;
