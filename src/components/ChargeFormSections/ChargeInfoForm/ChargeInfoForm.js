import { FormattedMessage, useIntl } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';

import {
  Row,
  Col,
  TextField,
  Select,
  TextArea,
  ButtonGroup,
  Button,
  KeyValue,
} from '@folio/stripes/components';
import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';
import {
  validateNotNegative,
  validateAsDecimal,
} from '../../../util/validators';
import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';

const [CHARGE_CATEGORY, CHARGE_STATUS, CHARGE_PAYER] = [
  'Charge.Category',
  'Charge.ChargeStatus',
  'Charge.Payer',
];

const ChargeInfoForm = () => {
  const intl = useIntl();
  const { values } = useFormState();
  const { change } = useForm();

  const refdataValues = useOARefdata([
    CHARGE_CATEGORY,
    CHARGE_STATUS,
    CHARGE_PAYER,
  ]);

  const categoryValues = selectifyRefdata(
    refdataValues,
    CHARGE_CATEGORY,
    'value'
  );
  const statusValues = selectifyRefdata(refdataValues, CHARGE_STATUS, 'value');
  const payerValues = selectifyRefdata(refdataValues, CHARGE_PAYER, 'value');

  const renderButtonGroup = () => {
    return (
      <KeyValue label={<FormattedMessage id="ui-oa.charge.type" />}>
        <ButtonGroup>
          <Button
            buttonStyle={
              values.discountType === 'percentage' ? 'primary' : 'default'
            }
            onClick={() => change('discountType', 'percentage')}
          >
            <FormattedMessage id="ui-oa.charge.type.percentage" />
          </Button>
          <Button
            buttonStyle={
              values.discountType === 'subtracted' ? 'primary' : 'default'
            }
            onClick={() => change('discountType', 'subtracted')}
          >
            <FormattedMessage id="ui-oa.charge.type.pound" />
          </Button>
        </ButtonGroup>
      </KeyValue>
    );
  };

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
            id="charge-currency"
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
        <Col xs={3}>
          <Field component={renderButtonGroup} name="discountType" />
        </Col>
        <Col xs={6}>
          <Field
            component={TextArea}
            label={<FormattedMessage id="ui-oa.charge.discountNote" />}
            name="discountNote"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.tax" />}
            name="tax"
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
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...categoryValues]}
            label={<FormattedMessage id="ui-oa.charge.category" />}
            name="category"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...statusValues]}
            label={<FormattedMessage id="ui-oa.charge.status" />}
            name="chargeStatus"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...payerValues]}
            label={<FormattedMessage id="ui-oa.charge.payer" />}
            name="payer"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextArea}
            label={<FormattedMessage id="ui-oa.charge.payerNote" />}
            name="payerNote"
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
