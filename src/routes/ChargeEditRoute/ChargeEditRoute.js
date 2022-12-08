import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { LoadingView } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { orderBy } from 'lodash';
import ChargeForm from '../../components/views/ChargeForm';
import urls from '../../util/urls';
import {
  CHARGE_ENDPOINT,
  PUBLICATION_REQUEST_ENDPOINT,
} from '../../constants/endpoints';

const ChargeEditRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { prId, chId } = useParams();
  const queryClient = useQueryClient();

  const handleClose = () => {
    history.push(
      `${urls.publicationRequestChargeView(prId, chId)}${location.search}`
    );
  };

  const { data: charge, isLoading } = useQuery([chId], () => ky(CHARGE_ENDPOINT(chId)).json());

  const { data: request } = useQuery(
    ['ui-oa', 'ChargeRoute', 'fetchPublicationRequest', prId],
    () => ky(PUBLICATION_REQUEST_ENDPOINT(prId)).json()
  );

  const { mutateAsync: putCharge } = useMutation(
    ['ui-oa', 'ChargeEditRoute', 'putCharge'],
    (data) => ky.put(CHARGE_ENDPOINT(chId), { json: data }).then(() => {
        queryClient.invalidateQueries(chId);
        handleClose();
      })
  );

  const submitCharge = async (values) => {
    const submitValues = {
      ...values,
      exchangeRate: {
        ...values.exchangeRate,
        fromCurrency: values?.amount?.baseCurrency,
      },
    };
    await putCharge(submitValues);
  };

  const getInitialValues = () => {
    return {
      ...charge,
      payers: orderBy(charge?.payers, 'payer.value'),
    };
  };

  if (isLoading) {
    return <LoadingView dismissible onClose={handleClose} />;
  }

  return (
    <Form
      initialValues={getInitialValues()}
      keepDirtyOnReinitialize
      mutators={arrayMutators}
      onSubmit={submitCharge}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <ChargeForm
            charge={charge}
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

export default ChargeEditRoute;
