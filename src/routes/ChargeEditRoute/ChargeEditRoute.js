import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation, useQuery } from 'react-query';
import { orderBy } from 'lodash';
import ChargeForm from '../../components/views/ChargeForm';
import urls from '../../util/urls';

const ChargeEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, chId } = useParams();

  const handleClose = () => {
    history.push(urls.publicationRequestChargeView(prId, chId));
  };

  const { data: charge, isLoading, refetch } = useQuery(
    ['ui-oa', 'publicationEditRoute', 'publicationRequest', prId],
    () => ky(`oa/charges/${chId}`).json()
  );

  const { data: request } = useQuery(
    ['ui-oa', 'ChargeRoute', 'getPublicationRequest', prId],
    () => ky(`oa/publicationRequest/${prId}`).json()
  );

  const { mutateAsync: putCharge } = useMutation(
    ['ui-oa', 'ChargeEditRoute', 'postCharge'],
    (data) => ky.put(`oa/charges/${chId}`, { json: data }).then(() => {
        handleClose();
        refetch();
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
      payers: orderBy(
        charge?.payers,
        'payer.value'
      ),
    };
  };

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
            isLoading={isLoading}
            request={request}
          />
        </form>
      )}
    </Form>
  );
};

export default ChargeEditRoute;
