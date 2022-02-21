import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import InvoiceForm from '../../components/views/InvoiceForm';
import urls from '../../util/urls';

const LinkInvoiceRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, chId } = useParams();

  const handleClose = () => {
    history.push(urls.publicationRequestChargeView(prId, chId));
  };

  const { data: charge } = useQuery(
    ['ui-oa', 'LinkInvoiceRoute', 'charge'],
    () => ky(`oa/publicationRequest/${prId}`).json()
  );

  const submitInvoice = (values) => {
    console.log(values);
  };

  return (
    <Form mutators={arrayMutators} onSubmit={submitInvoice}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <InvoiceForm
            charge={charge}
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

export default LinkInvoiceRoute;
