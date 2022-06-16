import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { AppIcon } from '@folio/stripes/core';
import { Link } from 'react-router-dom';

import { Accordion, Badge, Card, Layout, Row } from '@folio/stripes/components';

import { InvoiceInfo, InvoiceLineInfo } from '../../InvoiceSections';
import urls from '../../../util/urls';
import css from './ChargeInvoice.css';

const propTypes = {
  charge: PropTypes.object,
  invoice: PropTypes.object,
  invoiceLine: PropTypes.object,
};

const ChargeInvoice = ({ charge, invoice, invoiceLine }) => {
  const renderBadge = () => {
    return invoice && invoiceLine ? <Badge>2</Badge> : <Badge>0</Badge>;
  };

  const renderEmpty = () => {
    return (
      <Layout className={css.invoiceEmptyMessage}>
        <FormattedMessage id="ui-oa.charge.invoiceNotLinked" />
      </Layout>
    );
  };

  const renderInvoiceSections = () => {
    return (
      <>
        {invoice && (
          <Row>
            <Card
              cardStyle="positive"
              headerStart={
                <AppIcon app="invoice" size="small">
                  <Link to={urls?.invoice(charge?.invoiceReference)}>
                    <strong>{invoice?.vendorInvoiceNo}</strong>
                  </Link>
                </AppIcon>
              }
              roundedBorder
            >
              <InvoiceInfo charge={charge} invoice={invoice} />
            </Card>
          </Row>
        )}
        {invoiceLine && (
          <Row>
            <Card
              cardStyle="positive"
              headerStart={
                <AppIcon app="invoice" size="small">
                  <strong>
                    <Link
                      to={urls?.invoiceLine(
                        charge?.invoiceReference,
                        charge?.invoiceLineItemReference
                      )}
                    >
                      {invoiceLine?.invoiceLineNumber}
                      {invoiceLine?.description?.length > 50
                        ? ', ' + invoiceLine?.description.substr(0, 49) + '...'
                        : ', ' + invoiceLine?.description}
                    </Link>
                  </strong>
                </AppIcon>
              }
              roundedBorder
            >
              <InvoiceLineInfo invoiceLine={invoiceLine} />
            </Card>
          </Row>
        )}
      </>
    );
  };
  return (
    <>
      <Accordion
        closedByDefault
        displayWhenClosed={renderBadge()}
        displayWhenOpen={renderBadge()}
        label={<FormattedMessage id="ui-oa.charge.invoice" />}
      >
        {invoice && invoiceLine ? renderInvoiceSections() : renderEmpty()}
      </Accordion>
    </>
  );
};

ChargeInvoice.propTypes = propTypes;

export default ChargeInvoice;
