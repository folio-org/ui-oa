import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation, useQuery } from 'react-query';
import ChargeForm from '../../components/views/ChargeForm';
import chargeSubmitHandler from '../../util/chargeSubmitHandler';

const ChargeCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, chId } = useParams();

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${prId}`);
  };

  const { data: publicationRequest } = useQuery(
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

  const submitCharge = (values) => {
    const submitValues = chargeSubmitHandler(values);
    putCharge({ charges : [submitValues] });
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
