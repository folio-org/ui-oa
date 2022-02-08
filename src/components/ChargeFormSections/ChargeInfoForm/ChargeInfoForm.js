import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Row,
  Col,
  TextField,
  Select,
  TextArea,
} from '@folio/stripes/components';
import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';
import {
  validateNotNegative,
  validateAsDecimal,
} from '../../../util/validators';

const ChargeInfoForm = () => {
  const intl = useIntl();

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.amount" />}
            name="amount.value"
            required
            type="number"
            validate={composeValidators(
              requiredValidator,
              validateNotNegative,
              validateAsDecimal
            )}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              {
                value: 'USD',
                label: intl.formatMessage({
                  id: 'ui-oa.charge.currency.usd',
                }),
              },
            ]}
            id="charge-exchange-rate"
            label={<FormattedMessage id="ui-oa.charge.currency" />}
            name="amount.baseCurrency"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              {
                value: 'GBP',
                label: intl.formatMessage({
                  id: 'ui-oa.charge.currency.gbp',
                }),
              },
            ]}
            id="charge-exchange-rate"
            label={<FormattedMessage id="ui-oa.charge.exchangeRate" />}
            name="exchangeRate.toCurrency"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.coefficient" />}
            name="exchangeRate.coefficient"
            required
            type="number"
            validate={composeValidators(
              requiredValidator,
              validateNotNegative,
              validateAsDecimal
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.discount" />}
            name="discount"
            type="number"
            validate={composeValidators(validateNotNegative, validateAsDecimal)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field
            component={TextArea}
            fullWidth
            label={<FormattedMessage id="ui-oa.charge.description" />}
            name="description"
          />
        </Col>
      </Row>
    </>
  );
};
export default ChargeInfoForm;
