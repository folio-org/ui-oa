import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation } from 'react-query';
import View from '../views/PublicationRequestCreate';

const PublicationRequestCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();

  const handleClose = (id) => {
    let path = '/oa/publicationRequests';
    if (id) path += `/${id}`;
    history.push(path);
  };

  const { mutateAsync: postPublicationRequest } = useMutation(
    ['ui-oa', 'PublicationRequestCreateRoute', 'postPublicationRequest'],
    (data) => ky.post('oa/publicationRequest', { json: data }).json().then(res => {
      handleClose(res.id);
    })
  );

  const submitRequest = (values) => {
    const {
      useCorrespondingAuthor,
      correspondingAuthor,
      requestContact,
      ...submitValues
    } = { ...values };

    if (requestContact?.partyOwner?.id) {
      requestContact.role = 'request_contact';
      submitValues.requestContact = requestContact;
    }

    if (correspondingAuthor?.partyOwner?.id) {
      correspondingAuthor.role = 'corresponding_author';
      submitValues.correspondingAuthor = correspondingAuthor;
    }

    postPublicationRequest(submitValues);
  };

  return (
    <Form
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
          />
        </form>
      )}
    </Form>
  );
};

export default PublicationRequestCreateRoute;
