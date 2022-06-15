import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy, useStripes } from '@folio/stripes/core';
import { useAppSettings } from '@k-int/stripes-kint-components';
import { useMutation } from 'react-query';
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

  const defaultTax = useAppSettings({
    endpoint: 'oa/settings/appSettings',
    sectionName: 'PublicationRequests',
    keyName: 'default_tax',
  });

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
        tax: defaultTax?.value,
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
          />
        </form>
      )}
    </Form>
  );
};

export default ChargeCreateRoute;
