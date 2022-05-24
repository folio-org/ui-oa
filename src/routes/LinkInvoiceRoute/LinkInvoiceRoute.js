import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';
import LinkInvoiceForm from '../../components/views/LinkInvoiceForm';
import urls from '../../util/urls';
import useOARefdata from '../../util/useOARefdata';

const LinkInvoiceRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, chId } = useParams();
  const invoicedRefData = useOARefdata('Charge.ChargeStatus').find(
    (e) => e.value === 'invoiced'
  );

  const handleClose = () => {
    history.push(urls.publicationRequestChargeView(prId, chId));
  };

  const { data: request } = useQuery(
    ['ui-oa', 'LinkInvoiceRoute', 'request'],
    () => ky(`oa/publicationRequest/${prId}`).json()
  );

  const { mutateAsync: linkInvoice } = useMutation(
    ['ui-oa', 'LinkInvoiceRoute', 'linkInvoice'],
    (data) => ky.put(`oa/publicationRequest/${prId}`, { json: data }).then(() => {
        handleClose();
      })
  );

  const charge = request?.charges?.find((e) => e.id === chId);

  const submitInvoice = async (values) => {
    const submitValues = {
      charges: [
        {
          ...charge,
          invoiceReference: values?.selectedInvoice?.id,
          invoiceLineItemReference: values?.invoiceLine?.id,
          chargeStatus: invoicedRefData,
        },
      ],
    };
    await linkInvoice(submitValues);
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
