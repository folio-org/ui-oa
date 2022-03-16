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
  validateNotLessThanZero
} from '../../../util/validators';
import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';

const [CHARGE_CATEGORY, CHARGE_STATUS, CHARGE_PAYER, CHARGE_DISCOUNT_TYPE] = [
  'Charge.Category',
  'Charge.ChargeStatus',
  'Charge.Payer',
  'Charge.DiscountType',
];

const ChargeInfoForm = () => {
  const intl = useIntl();
  const { values } = useFormState();
  const { change } = useForm();

  const refdataValues = useOARefdata([
    CHARGE_CATEGORY,
    CHARGE_STATUS,
    CHARGE_PAYER,
    CHARGE_DISCOUNT_TYPE,
  ]);

  const categoryValues = selectifyRefdata(refdataValues, CHARGE_CATEGORY);
  const statusValues = selectifyRefdata(refdataValues, CHARGE_STATUS);
  const payerValues = selectifyRefdata(refdataValues, CHARGE_PAYER);
  const discountTypeValues = selectifyRefdata(
    refdataValues,
    CHARGE_DISCOUNT_TYPE
  );

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
                value: 'GBP',
                label: intl.formatMessage({
                  id: 'ui-oa.charge.currency.gbp',
                }),
              },
            ]}
            id="charge-currency"
            label={<FormattedMessage id="ui-oa.charge.currency" />}
            name="exchangeRate.toCurrency"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.exchangeRate" />}
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
          <Field
            name="discountType.id"
            render={() => (
              <KeyValue label={<FormattedMessage id="ui-oa.charge.type" />}>
                <ButtonGroup>
                  {discountTypeValues.map((discountType) => (
                    <Button
                      buttonStyle={
                        values?.discountType?.id === discountType.value
                          ? 'primary'
                          : 'default'
                      }
                      onClick={() => change('discountType.id', discountType.value)}
                    >
                      <FormattedMessage
                        id={`ui-oa.charge.type.${discountType.label}`}
                      />
                    </Button>
                  ))}
                </ButtonGroup>
              </KeyValue>
            )}
          />
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
            label={<FormattedMessage id="ui-oa.charge.taxPercentage" />}
            name="tax"
            required
            type="number"
            validate={composeValidators(
              requiredValidator,
              validateNotLessThanZero,
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
            name="category.id"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...statusValues]}
            label={<FormattedMessage id="ui-oa.charge.status" />}
            name="chargeStatus.id"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...payerValues]}
            label={<FormattedMessage id="ui-oa.charge.payer" />}
            name="payer.id"
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
