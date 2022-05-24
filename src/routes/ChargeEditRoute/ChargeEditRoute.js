import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation, useQuery } from 'react-query';
import ChargeForm from '../../components/views/ChargeForm';

const ChargeEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, chId } = useParams();

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${prId}/charge/${chId}`);
  };

  const { data: publicationRequest, isLoading } = useQuery(
    ['ui-oa', 'publicationEditRoute', 'publicationRequest', prId],
    () => ky(`oa/publicationRequest/${prId}`).json()
  );

  const charge = publicationRequest?.charges?.find((e) => e?.id === chId);

  const { mutateAsync: putCharge } = useMutation(
    ['ui-oa', 'ChargeCreateRoute', 'postCharge'],
    (data) => ky.put(`oa/publicationRequest/${prId}`, { json: data }).then(() => {
        handleClose();
      })
  );

  const submitCharge = async (values) => {
    const submitValues = {
      charges: [
        {
          ...values,
          exchangeRate: {
            ...values.exchangeRate,
            fromCurrency: values?.amount?.baseCurrency,
          },
        },
      ],
    };
    await putCharge(submitValues);
  };

  return (
    <Form
      initialValues={charge}
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
          />
        </form>
      )}
    </Form>
  );
};

export default ChargeEditRoute;
