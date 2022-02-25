import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation } from 'react-query';
import ChargeForm from '../../components/views/ChargeForm';

const ChargeCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { id } = useParams();

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${id}`);
  };

  const { mutateAsync: postCharge } = useMutation(
    ['ui-oa', 'ChargeCreateRoute', 'postCharge'],
    (data) => ky.put(`oa/publicationRequest/${id}`, { json: data }).then(() => {
        handleClose();
      })
  );

  const submitCharge = (values) => {
    const submitValues = { charges: [values] };
    postCharge(submitValues);
  };

  return (
    <Form
      initialValues={{ discountType: { value: 'percentage' } }}
      mutators={arrayMutators}
      onSubmit={submitCharge}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <ChargeForm
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

export default ChargeCreateRoute;
