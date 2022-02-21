import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import LinkInvoiceForm from '../../components/views/LinkInvoiceForm';
import urls from '../../util/urls';

const LinkInvoiceRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, chId } = useParams();

  const handleClose = () => {
    history.push(urls.publicationRequestChargeView(prId, chId));
  };

  const { data: request } = useQuery(
    ['ui-oa', 'LinkInvoiceRoute', 'request'],
    () => ky(`oa/publicationRequest/${prId}`).json()
  );

  const charge = request?.charges?.find(e => e.id === chId);

  const submitInvoice = (values) => {
    console.log(values);
  };
  return (
    <Form mutators={arrayMutators} onSubmit={submitInvoice}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <LinkInvoiceForm
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
