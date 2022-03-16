import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy, useStripes } from '@folio/stripes/core';
import { useMutation } from 'react-query';
import ChargeForm from '../../components/views/ChargeForm';
import useOARefdata from '../../util/useOARefdata';

const ChargeCreateRoute = () => {
  const stripes = useStripes();
  const history = useHistory();
  const ky = useOkapiKy();
  const { id } = useParams();

  const perecentage = useOARefdata('Charge.DiscountType').find(e => e.label === 'percentage');

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
    const submitValues = {
      charges: [
        { ...values, amount: { ...values.amount, baseCurrency: stripes?.currency } },
      ],
    };
    postCharge(submitValues);
  };

  return (
    <Form
      initialValues={{
        discountType: { id: perecentage?.id },
        exchangeRate: { coefficient: 1 },
      }}
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
