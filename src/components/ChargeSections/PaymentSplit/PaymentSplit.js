import PropTypes from 'prop-types';

import { FormattedMessage, FormattedNumber } from 'react-intl';
import {
  Accordion,
  MultiColumnList,
  Badge,
  Col,
  Row,
} from '@folio/stripes/components';
import getSortedItems from '../../../util/getSortedItems';

const propTypes = {
  charge: PropTypes.object,
};

const PaymentSplit = ({ charge }) => {
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
        <FormattedNumber
          currency={charge?.amount?.baseCurrency}
          // eslint-disable-next-line react/style-prop-object
          style="currency"
          value={e?.payerAmount}
        />
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
      label={<FormattedMessage id="ui-oa.charge.paymentSplit" />}
    >
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
              <FormattedMessage id="ui-oa.charge.paymentSplit.isEmptyMessage" />
            }
            visibleColumns={['payer', 'payerAmount', 'payerNote']}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

PaymentSplit.propTypes = propTypes;

export default PaymentSplit;
