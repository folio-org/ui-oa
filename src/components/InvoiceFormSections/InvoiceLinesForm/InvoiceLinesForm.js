import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

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
  const renderBadge = (lines) => {
    return lines ? <Badge>{lines?.length}</Badge> : <Badge>0</Badge>;
  };

  const renderAddInvoiceLineButton = () => {
    return (
      <>
        <Button id="add-invoice-line-button">
          <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.addLine" />
        </Button>
      </>
    );
  };
  return (
    <Accordion
      displayWhenClosed={renderBadge(charge?.lines)}
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
              poStatus: (
                <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.poStatus" />
              ),
              receiptStatus: (
                <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.receiptStatus" />
              ),
              paymentStatus: (
                <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.paymentStatus" />
              ),
              vendorReferenceNumber: (
                <FormattedMessage id="ui-oa.charge.invoice.invoiceLine.vendorReferenceNumber" />
              ),
            }}
            contentData={charge?.lines}
            visibleColumns={[
              'lineNumber',
              'description',
              'fundCode',
              'poStatus',
              'receiptStatus',
              'paymentStatus',
              'vendorReferenceNumber',
            ]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

InvoiceLinesForm.propTypes = propTypes;

export default InvoiceLinesForm;
