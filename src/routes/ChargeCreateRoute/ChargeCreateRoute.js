import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useOkapiKy, useStripes } from '@folio/stripes/core';
import { useAppSettings } from '@k-int/stripes-kint-components';
import { useMutation, useQuery } from 'react-query';

import ChargeForm from '../../components/views/ChargeForm';
import urls from '../../util/urls';
import {
  CHARGES_ENDPOINT,
  PUBLICATION_REQUEST_ENDPOINT,
} from '../../constants/endpoints';

const ChargeCreateRoute = () => {
  const stripes = useStripes();
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { id } = useParams();

  const defaultTax = useAppSettings({
    endpoint: 'oa/settings/appSettings',
    sectionName: 'PublicationRequests',
    keyName: 'default_tax',
  });

  const handleClose = (chargeId) => {
    if (chargeId) {
      history.push(
        `${urls.publicationRequestChargeView(id, chargeId)}${location.search}`
      );
    } else {
      history.push(`${urls.publicationRequest(id)}${location.search}`);
    }
  };

  const { mutateAsync: postCharge } = useMutation(
    ['ui-oa', 'ChargeCreateRoute', 'postCharge'],
    (data) => ky
        .post(CHARGES_ENDPOINT, { json: data })
        .json()
        .then((res) => {
          handleClose(res?.id);
        })
  );

  const { data: request } = useQuery(
    ['ui-oa', 'ChargeRoute', 'getPublicationRequest', id],
    () => ky(PUBLICATION_REQUEST_ENDPOINT(id)).json()
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
        discountType: { value: 'percentage' },
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
