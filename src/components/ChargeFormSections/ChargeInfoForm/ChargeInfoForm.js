import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
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
  Label,
} from '@folio/stripes/components';
import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';
import { FieldCurrency, CurrencySymbol } from '@folio/stripes-acq-components';
import { useStripes } from '@folio/stripes-core';
import {
  validateNotNegative,
  validateAsDecimal,
  validateNotLessThanZero,
} from '../../../util/validators';
import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';
import useExchangeRateValue from '../../../hooks/useExchangeRateValue';

const [CHARGE_CATEGORY, CHARGE_STATUS, CHARGE_PAYER, CHARGE_DISCOUNT_TYPE] = [
  'Charge.Category',
  'Charge.ChargeStatus',
  'Charge.Payer',
  'Charge.DiscountType',
];

const ChargeInfoForm = () => {
  const { initialValues, values } = useFormState();
  const { change } = useForm();
  const stripes = useStripes();
  const { exchangeRate, isLoading, refetch } = useExchangeRateValue(
    stripes?.currency,
    values?.exchangeRate?.toCurrency
  );

  const [isEdit, setIsEdit] = useState(
    !!initialValues?.exchangeRate?.coefficient
  );

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

  const truncateNumber = (number) => {
    return number
      ? Number(number.toString().match(/^-?\d+(?:\.\d{0,10})?/)[0])
      : null;
  };

  // TODO Create Custom component for handling exchange rate coefficient
  useEffect(() => {
    if (!isLoading && !isEdit) {
      change('exchangeRate.coefficient', truncateNumber(exchangeRate));
    }
  }, [isLoading, change, exchangeRate, isEdit]);

  const handleCurrencyChange = (currency) => {
    if (isEdit) {
      setIsEdit(false);
      change('exchangeRate.toCurrency', currency);
    }
    change('exchangeRate.toCurrency', currency);
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
          <FieldCurrency
            id="charge-currency"
            labelId="ui-oa.charge.currency"
            name="exchangeRate.toCurrency"
            onChange={handleCurrencyChange}
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
        <Col xs={3}>
          <Label>
            <FormattedMessage id="ui-oa.charge.refreshExchangeRate" />
          </Label>
          <Button
            buttonStyle="primary"
            disabled={!exchangeRate}
            onClick={() => {
              refetch().then(
                change('exchangeRate.coefficient', truncateNumber(exchangeRate))
              );
            }}
          >
            <FormattedMessage id="ui-oa.charge.updateExchangeRate" />
          </Button>
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
                <ButtonGroup fullWidth>
                  {discountTypeValues.map((discountType) => (
                    <Button
                      buttonStyle={
                        values?.discountType?.id === discountType.value
                          ? 'primary'
                          : 'default'
                      }
                      onClick={() => {
                        change('discountType.id', discountType.value);
                      }}
                    >
                      <FormattedMessage
                        id={`ui-oa.charge.type.${discountType.label}`}
                        values={{
                          currency: (
                            <CurrencySymbol
                              currency={values?.exchangeRate?.toCurrency}
                              stripes={stripes}
                            />
                          ),
                        }}
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
