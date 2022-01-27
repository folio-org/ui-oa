import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';
import PartyForm from '../components/views/PartyForm';

const PartyEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { id } = useParams();

  const handleClose = () => {
    history.push(`/oa/people/${id}`);
  };

  const { data: party } = useQuery(
    ['ui-oa', 'PartyEditRoute', 'party', id],
    () => ky(`oa/party/${id}`).json()
  );

  const { mutateAsync: putParty } = useMutation(
    ['ui-oa', 'PartyEditRoute', 'putParty'],
    (data) => ky.put(`oa/party/${data.id}`, { json: data }).then(() => {
        handleClose();
      })
  );

  const submitRequest = (values) => {
    putParty(values);
  };

  return (
    <Form
      initialValues={party}
      mutators={arrayMutators}
      onSubmit={submitRequest}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <PartyForm
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
            party={party}
          />
        </form>
      )}
    </Form>
  );
};

export default PartyEditRoute;
