/* eslint-disable react/style-prop-object */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { Field, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { ARRAY_ERROR } from 'final-form';

import {
  Accordion,
  Badge,
  Button,
  Col,
  IconButton,
  Row,
  Select,
  TextArea,
  TextField,
  Tooltip,
} from '@folio/stripes/components';
import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import {
  validateNotNegative,
  validateAsDecimal,
  validateMoreThanTotal,
} from '../../../util/validators';

import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';
import { getEstimatedInvoicePrice, getTotalPayersAmount } from '../../../util/chargeUtils';

import css from './PayersFieldArray.css';

const PayersField = ({ fields: { name } }) => {
  const { values } = useFormState();
  const [optionsInUse, setOptionsInUse] = useState([]);
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);
  const payerNameValues = selectifyRefdata(useOARefdata('Payer.Payer'));

  useEffect(() => {
    setOptionsInUse(
      values?.payers?.map((i) => i?.payer?.id).filter((x) => !!x)
    );
  }, [values]);

  return (
    <>
      {items.map((payer, index) => {
        const availableOptions = payerNameValues.filter(
          (data) => !optionsInUse?.includes(data.value) ||
            data.value === payer?.payer?.id ||
            data.value === ' '
        );
        return (
          <Row key={payer + index} data-testid={`PayersFieldArray[${index}]`}>
            <Col xs={3}>
              <Field
                autoFocus={!payer.id}
                component={Select}
                dataOptions={[{ value: '', label: '' }, ...availableOptions]}
                label={<FormattedMessage id="ui-oa.charge.payer" />}
                name={`${name}[${index}].payer.id`}
                required
                validate={requiredValidator}
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.charge.payerAmount" />}
                name={`${name}[${index}].payerAmount`}
                required
                type="number"
                validate={composeValidators(
                  requiredValidator,
                  validateNotNegative,
                  validateAsDecimal
                )}
              />
            </Col>
            <Col xs={5}>
              <Field
                component={TextArea}
                label={<FormattedMessage id="ui-oa.charge.payerNote" />}
                name={`${name}[${index}].payerNote`}
              />
            </Col>
            <Col xs={1}>
              <Tooltip
                id={`payer-${index + 1}-trash-button-tooltip`}
                text={
                  <FormattedMessage
                    id="ui-oa.charge.removePayerIndex"
                    values={{ index: index + 1 }}
                  />
                }
              >
                {({ ref, ariaIds }) => (
                  <IconButton
                    ref={ref}
                    aria-describedby={ariaIds.sub}
                    aria-labelledby={ariaIds.text}
                    icon="trash"
                    onClick={() => onDeleteField(index, payer)}
                    style={{ 'padding-top': '25px' }}
                  />
                )}
              </Tooltip>
            </Col>
          </Row>
        );
      })}
      <Button
        disabled={items?.length >= payerNameValues?.length}
        onClick={() => onAddField({})}
      >
        <FormattedMessage id="ui-oa.charge.addPayer" />
      </Button>
    </>
  );
};

PayersField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const PayersFieldArray = () => {
  const { values, errors } = useFormState();
  const { items } = useKiwtFieldArray('payers');

  const estimatedInvoicePrice = getEstimatedInvoicePrice(values);
  const totalPayersAmount = getTotalPayersAmount(values?.payers);

  const renderBadge = (payers) => {
    return payers ? <Badge>{payers?.length}</Badge> : <Badge>0</Badge>;
  };

  return (
    <Accordion
      displayWhenClosed={renderBadge(items)}
      displayWhenOpen={renderBadge(items)}
      label={<FormattedMessage id="ui-oa.charge.payers" />}
    >
      <Row>
        <Col xs={12}>
          <FormattedMessage
            id="ui-oa.charge.payers.remainingAmount"
            values={{
              amount: (
                <FormattedNumber
                  currency={values?.amount?.baseCurrency}
                  style="currency"
                  value={estimatedInvoicePrice - totalPayersAmount}
                />
              ),
            }}
          />
        </Col>
      </Row>
      {errors?.payers?.[ARRAY_ERROR] && (
        <>
          <br />
          <Row>
            <Col className={css.feedbackError} xs={12}>
              {errors?.payers?.[ARRAY_ERROR]}
            </Col>
          </Row>
        </>
      )}
      <br />
      <FieldArray
        component={PayersField}
        name="payers"
        validate={validateMoreThanTotal}
      />
    </Accordion>
  );
};

export default PayersFieldArray;
