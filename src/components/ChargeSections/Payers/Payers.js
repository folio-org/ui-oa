import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import {
  Accordion,
  MultiColumnList,
  Badge,
  Col,
  Row,
} from '@folio/stripes/components';
import getSortedItems from '../../../util/getSortedItems';
import {
  getEstimatedInvoicePrice,
  getTotalPayersAmount,
} from '../../../util/chargeUtils';

const propTypes = {
  charge: PropTypes.object,
};

const Payers = ({ charge }) => {
  const estimatedInvoicePrice = getEstimatedInvoicePrice(charge);
  const totalPayersAmount = getTotalPayersAmount(charge?.payers);

  const sortedFundings = getSortedItems(charge?.payers, null, {
    column: 'payer.value',
    direction: 'asc',
  });

  const renderBadge = (payers) => {
    return payers ? <Badge>{payers?.length}</Badge> : <Badge>0</Badge>;
  };

  const formatter = {
    payer: (e) => {
      return e?.payer?.label;
    },
    payerAmount: (e) => {
      return (
        <>
          {charge?.amount?.baseCurrency}
          {e?.payerAmount?.toFixed(2)}
        </>
      );
    },
    payerNote: (e) => {
      return e?.payerNote;
    },
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(charge?.payers)}
      displayWhenOpen={renderBadge(charge?.payers)}
      label={<FormattedMessage id="ui-oa.charge.payers" />}
    >
      <br />
      <Row>
        <Col xs={12}>
          <FormattedMessage
            id="ui-oa.charge.payers.remainingAmount"
            values={{
              amount: (
                <>
                  {charge?.amount?.baseCurrency}
                  {(estimatedInvoicePrice - totalPayersAmount)?.toFixed(2)}
                </>
              ),
            }}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              payer: <FormattedMessage id="ui-oa.charge.payer" />,
              payerAmount: <FormattedMessage id="ui-oa.charge.amount" />,
              payerNote: <FormattedMessage id="ui-oa.charge.payerNote" />,
            }}
            contentData={sortedFundings}
            formatter={formatter}
            interactive={false}
            isEmptyMessage={
              <FormattedMessage id="ui-oa.charge.payers.isEmptyMessage" />
            }
            visibleColumns={['payer', 'payerAmount', 'payerNote']}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

Payers.propTypes = propTypes;

export default Payers;
