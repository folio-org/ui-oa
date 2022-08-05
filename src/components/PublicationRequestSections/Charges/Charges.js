/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { IfPermission, useStripes } from '@folio/stripes/core';
import {
  Accordion,
  Badge,
  Button,
  MultiColumnList,
  Row,
  Col,
  MessageBanner,
  Layout,
  Tooltip,
  Icon,
} from '@folio/stripes/components';

import urls from '../../../util/urls';
import { getSortedItems } from '../../../util';
import { useInvoice, useInvoiceLine } from '../../../hooks/invoiceHooks';

import css from './Charges.css';

const chargesPropTypes = {
  request: PropTypes.object,
};

const invoiceLineLinkPropTypes = {
  charge: PropTypes.object,
};

const InvoiceLineLink = ({ charge }) => {
  const invoice = useInvoice(charge?.invoiceReference);
  const invoiceLine = useInvoiceLine(charge?.invoiceLineItemReference);
  return (
    <Tooltip
      id={`charge-${charge.rowIndex + 1}-invoiced-button`}
      text={
        <FormattedMessage
          id="ui-oa.charge.linkToInvoiceLineIndex"
          values={{ index: charge.rowIndex + 1 }}
        />
      }
    >
      {({ ref, ariaIds }) => (
        <a
          ref={ref}
          aria-describedby={ariaIds.sub}
          aria-labelledby={ariaIds.text}
          href={urls.invoiceLine(
            charge?.invoiceReference,
            charge?.invoiceLineItemReference
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <strong>
            {invoice?.vendorInvoiceNo}: {invoiceLine?.invoiceLineNumber}
          </strong>
        </a>
      )}
    </Tooltip>
  );
};

const Charges = ({ request }) => {
  const stripes = useStripes();
  const history = useHistory();

  const [sortedColumn, setSortedColumn] = useState({
    column: 'description',
    direction: 'desc',
  });

  const sortFormatter = {
    description: ['chargeStatus.value', 'category.value'],
    netAmount: ['amount.value'],
    calculatedAmount: ['estimatedPrice.value', 'estimatedInvoicePrice.value'],
  };

  const sortedCharges = getSortedItems(
    request?.charges,
    sortFormatter,
    sortedColumn
  );

  const renderBadge = (charges) => {
    return charges ? <Badge>{charges?.length}</Badge> : <Badge>0</Badge>;
  };

  const handleRowClick = (_e, charge) => {
    history.push(
      `${urls.publicationRequestChargeView(request?.id, charge?.id)}`
    );
  };

  const renderAddChargesButton = () => {
    return (
      <>
        <IfPermission perm="oa.publicationRequest.edit">
          <Button
            disabled={!stripes?.currency}
            id="add-charge-button"
            to={`${urls.publicationRequestChargeCreate(request?.id)}`}
          >
            <FormattedMessage id="ui-oa.publicationRequest.addCharge" />
          </Button>
        </IfPermission>
      </>
    );
  };

  const formatter = {
    description: (e) => {
      return (
        <div>
          <div>
            <strong>
              <FormattedMessage id="ui-oa.charge.status" />:{' '}
            </strong>
            {e?.chargeStatus?.label}
          </div>
          <div>
            <strong>
              <FormattedMessage id="ui-oa.charge.category" />:{' '}
            </strong>
            {e?.category?.label}
          </div>
          {e?.description && (
            <div>
              <strong>
                <FormattedMessage id="ui-oa.charge.description" />:{' '}
              </strong>
              {e.description}
            </div>
          )}
          {e?.payers?.length > 0 && (
            <div>
              <strong>
                <FormattedMessage id="ui-oa.charge.payersBrackets" />:{' '}
              </strong>
              {e.payers.map((i) => {
                return (
                  <li>
                    {i?.payer?.label}: {e?.amount.baseCurrency}
                    {i?.payerAmount}
                  </li>
                );
              })}
            </div>
          )}
        </div>
      );
    },
    calculatedAmount: (e) => {
      return (
        <div>
          <div>
            {e?.estimatedPrice?.baseCurrency}
            {e?.estimatedPrice?.value}
          </div>
          {e?.estimatedInvoicePrice?.baseCurrency !== stripes?.currency && (
            <div>
              {e?.estimatedInvoicePrice?.baseCurrency}
              {e?.estimatedInvoicePrice?.value}
            </div>
          )}
        </div>
      );
    },
    netAmount: (e) => {
      return (
        <>
          {e?.amount?.baseCurrency}
          {e?.amount?.value}
        </>
      );
    },
    invoiceLine: (e) => {
      if (
        e?.chargeStatus?.value === 'invoiced' &&
        e?.invoiceLineItemReference
      ) {
        return <InvoiceLineLink charge={e} />;
      }
      if (
        e?.chargeStatus?.value === 'invoiced' &&
        !e?.invoiceLineItemReference
      ) {
        return (
          <>
            <Icon icon="exclamation-circle" status="warn" />
            <div className={css.errorMessage}>
              <FormattedMessage id="ui-oa.charge.invoiceLineNotLinked" />
            </div>
          </>
        );
      }
      return null;
    },
  };

  const onHeaderClick = (_e, meta) => {
    if (sortedColumn.column !== meta.name) {
      setSortedColumn({
        column: meta.name,
        direction: 'desc',
      });
    } else {
      setSortedColumn({
        column: sortedColumn.column,
        direction: sortedColumn.direction === 'desc' ? 'asc' : 'desc',
      });
    }
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.charges)}
      displayWhenOpen={renderAddChargesButton()}
      label={<FormattedMessage id="ui-oa.publicationRequest.charges" />}
    >
      {stripes?.currency ? (
        <Row>
          <Col xs={12}>
            <MultiColumnList
              columnMapping={{
                description: <FormattedMessage id="ui-oa.charge.description" />,
                netAmount: <FormattedMessage id="ui-oa.charge.netAmount" />,
                calculatedAmount: (
                  <FormattedMessage id="ui-oa.charge.calculatedAmount" />
                ),
                invoiceLine: <FormattedMessage id="ui-oa.charge.invoiceLine" />,
              }}
              columnWidths={{ description: 300 }}
              contentData={sortedCharges}
              formatter={formatter}
              isEmptyMessage={
                <FormattedMessage id="ui-oa.publicationRequest.emptyCharges" />
              }
              onHeaderClick={onHeaderClick}
              onRowClick={handleRowClick}
              sortDirection={`${sortedColumn.direction}ending`}
              sortedColumn={sortedColumn.column}
              visibleColumns={[
                'description',
                'netAmount',
                'calculatedAmount',
                'invoiceLine',
              ]}
            />
          </Col>
        </Row>
      ) : (
        <Layout className="padding-all-gutter">
          <MessageBanner type="warning">
            <FormattedMessage id="ui-oa.publicationRequest.noCurrencySet" />
          </MessageBanner>
        </Layout>
      )}
    </Accordion>
  );
};

Charges.propTypes = chargesPropTypes;
InvoiceLineLink.propTypes = invoiceLineLinkPropTypes;

export default Charges;
