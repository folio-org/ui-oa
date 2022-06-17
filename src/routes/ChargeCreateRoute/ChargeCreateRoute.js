import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy, useStripes } from '@folio/stripes/core';
import { useMutation, useQuery } from 'react-query';
import ChargeForm from '../../components/views/ChargeForm';
import useOARefdata from '../../util/useOARefdata';
import urls from '../../util/urls';

const ChargeCreateRoute = () => {
  const stripes = useStripes();
  const history = useHistory();
  const ky = useOkapiKy();
  const { id } = useParams();

  const perecentage = useOARefdata('Charge.DiscountType').find(
    (e) => e.label === 'percentage'
  );

  const handleClose = (chargeId) => {
    if (chargeId) {
      history.push(urls.publicationRequestChargeView(id, chargeId));
    } else {
      history.push(urls.publicationRequest(id));
    }
  };

  const { mutateAsync: postCharge } = useMutation(
    ['ui-oa', 'ChargeCreateRoute', 'postCharge'],
    (data) => ky
        .post('oa/charges', { json: data })
        .json()
        .then((res) => {
          handleClose(res?.id);
        })
  );

  const { data: request } = useQuery(
    ['ui-oa', 'ChargeRoute', 'getPublicationRequest', id],
    () => ky(`oa/publicationRequest/${id}`).json()
  );

  const submitCharge = async (values) => {
    const submitValues = {
      ...values,
      exchangeRate: {
        ...values.exchangeRate,
        toCurrency: stripes?.currency,
      },
      owner: { id },
    };
    await postCharge(submitValues);
  };

  return (
    <Form
      initialValues={{
        discountType: { id: perecentage?.id },
        exchangeRate: { coefficient: 1 },
        amount: { baseCurrency: stripes?.currency },
      }}
      keepDirtyOnReinitialize
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
            request={request}
          />
        </form>
      )}
    </Form>
  );
};

export default ChargeCreateRoute;
