import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useFormState, useForm } from 'react-final-form';

import {
  Accordion,
  Col,
  Row,
  MultiColumnList,
  Badge,
  Button,
} from '@folio/stripes/components';

const propTypes = {
  charge: PropTypes.object,
};

const InvoiceLinesForm = ({ charge }) => {
  const { values } = useFormState();
  const { change } = useForm();

  const renderBadge = (lines) => {
    return lines ? <Badge>{lines?.length}</Badge> : <Badge>0</Badge>;
  };

  const handleLineCreate = () => {
    const addLine = {
      ...values.invoice,
      lines: [
        {
          description: charge?.description,
          subTotal: charge?.amount?.value,
          status: 'Open',
        },
      ],
    };
    change('invoice', addLine);
  };

  const renderAddInvoiceLineButton = () => {
    return (
      <>
        <Button id="add-invoice-line-button" onClick={() => handleLineCreate()}>
          <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.addLine" />
        </Button>
      </>
    );
  };

  const formatter = {
    lineNumber: (e) => {
      return e?.rowIndex + 1;
    },
  };
  return (
    <Accordion
      displayWhenClosed={renderBadge(values?.invoice?.lines)}
      displayWhenOpen={renderAddInvoiceLineButton()}
      label={<FormattedMessage id="ui-oa.charge.invoice.invoiceLines" />}
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              lineNumber: (
                <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.lineNumber" />
              ),
              description: (
                <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.description" />
              ),
              fundCode: (
                <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.fundCode" />
              ),
              status: (
                <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.status" />
              ),
              vendorInvoiceNumber: (
                <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.vendorInvoiceNumber" />
              ),
              subTotal: (
                <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.subTotal" />
              ),
            }}
            contentData={values?.invoice?.lines}
            formatter={formatter}
            visibleColumns={[
              'lineNumber',
              'description',
              'fundCode',
              'status',
              'vendorInvoiceNumber',
              'subTotal',
            ]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

InvoiceLinesForm.propTypes = propTypes;

export default InvoiceLinesForm;
