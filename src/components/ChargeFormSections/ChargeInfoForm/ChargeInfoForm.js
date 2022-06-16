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

const [CHARGE_CATEGORY, CHARGE_STATUS, CHARGE_DISCOUNT_TYPE] = [
  'Charge.Category',
  'Charge.ChargeStatus',
  'Charge.DiscountType',
];

const ChargeInfoForm = () => {
  const { initialValues, values } = useFormState();
  const { change } = useForm();
  const stripes = useStripes();
  const { exchangeRate, isLoading, refetch } = useExchangeRateValue(
    values?.amount?.baseCurrency,
    stripes?.currency
  );

  const [isEdit, setIsEdit] = useState(
    !!initialValues?.exchangeRate?.coefficient
  );

  const refdataValues = useOARefdata([
    CHARGE_CATEGORY,
    CHARGE_STATUS,
    CHARGE_DISCOUNT_TYPE,
  ]);

  const categoryValues = selectifyRefdata(refdataValues, CHARGE_CATEGORY);
  const statusValues = selectifyRefdata(refdataValues, CHARGE_STATUS);
  const discountTypeValues = selectifyRefdata(
    refdataValues,
    CHARGE_DISCOUNT_TYPE
  );

  const truncateNumber = (number) => {
    return number
      ? Number(number.toString().match(/^-?\d+(?:\.\d{0,10})?/)[0])
      : null;
  };

  useEffect(() => {
    if (!isLoading && !isEdit) {
      change('exchangeRate.coefficient', truncateNumber(exchangeRate));
    }
  }, [isLoading, change, exchangeRate, isEdit]);

  const handleCurrencyChange = (currency) => {
    if (isEdit) {
      setIsEdit(false);
      change('amount.baseCurrency', currency);
    }
    change('amount.baseCurrency', currency);
  };

  return (
    <>
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
        <Col xs={6}>
          <Field
            component={TextArea}
            fullWidth
            label={<FormattedMessage id="ui-oa.charge.description" />}
            name="description"
            parse={(v) => v}
          />
        </Col>
      </Row>
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
            name="amount.baseCurrency"
            onChange={handleCurrencyChange}
            required
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
            parse={(v) => Number(v)}
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
                        change('discountType.value', discountType.label);
                      }}
                    >
                      <FormattedMessage
                        id={`ui-oa.charge.type.${discountType.label}`}
                        values={{
                          currency: (
                            <CurrencySymbol
                              currency={values?.amount?.baseCurrency}
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
            parse={(v) => v}
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
    </>
  );
};

export default ChargeInfoForm;
