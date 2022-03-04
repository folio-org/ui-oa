import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation } from 'react-query';
import PartyForm from '../../components/views/PartyForm';

const PartyCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();

  const handleClose = (id) => {
    history.push(`/oa/people/${id}`);
  };

  const { mutateAsync: postParty } = useMutation(
    ['ui-oa', 'PartyCreateRoute', 'postParty'],
    (data) => ky.post('oa/party', { json: data }).json().then(res => {
        handleClose(res.id);
      })
  );

  const submitParty = (values) => {
    postParty(values);
  };

  return (
    <Form
      mutators={arrayMutators}
      onSubmit={submitParty}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <PartyForm
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

export default PartyCreateRoute;
