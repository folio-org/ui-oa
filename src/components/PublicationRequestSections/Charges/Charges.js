/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
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
} from '@folio/stripes/components';

import urls from '../../../util/urls';
import getSortedItems from '../../../util/getSortedItems';

const propTypes = {
  request: PropTypes.object,
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
    amount: ['amount.value'],
    estimatedPrices: ['estimatedPrice.value', 'estimatedInvoicePrice.value'],
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

  const renderInvoiceLineLink = (charge) => {
    return charge?.invoiceLineItemReference &&
      charge?.chargeStatus?.value === 'invoiced' ? (
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
              {charge?.chargeStatus?.label}
            </a>
        )}
        </Tooltip>
    ) : (
      charge?.chargeStatus?.label
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
            {renderInvoiceLineLink(e)}
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
        </div>
      );
    },
    estimatedPrices: (e) => {
      return (
        <div>
          <div>
            <FormattedNumber
              currency={e?.estimatedPrice?.baseCurrency}
              style="currency"
              value={e?.estimatedPrice?.value}
            />
          </div>
          {e?.estimatedInvoicePrice?.baseCurrency !== stripes?.currency && (
            <div>
              <FormattedNumber
                currency={e?.estimatedInvoicePrice?.baseCurrency}
                style="currency"
                value={e?.estimatedInvoicePrice?.value}
              />
            </div>
          )}
        </div>
      );
    },
    amount: (e) => {
      return (
        <FormattedNumber
          currency={e?.amount?.baseCurrency}
          style="currency"
          value={e?.amount?.value}
        />
      );
    },
    discount: (e) => {
      return e?.discountType?.value === 'percentage' ? (
        e?.discount + '%'
      ) : (
        <FormattedNumber
          currency={e?.amount?.baseCurrency}
          style="currency"
          value={e?.discount}
        />
      );
    },
    tax: (e) => {
      return e?.tax + '%';
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
                amount: <FormattedMessage id="ui-oa.charge.amount" />,
                discount: <FormattedMessage id="ui-oa.charge.discount" />,
                tax: <FormattedMessage id="ui-oa.charge.tax" />,
                estimatedPrices: (
                  <FormattedMessage id="ui-oa.charge.estimatedAmount" />
                ),
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
                'amount',
                'discount',
                'tax',
                'estimatedPrices',
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

Charges.propTypes = propTypes;

export default Charges;
