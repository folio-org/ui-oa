import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Row,
  Select,
  TextArea,
  TextField,
  Tooltip,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';

const PayersField = ({ fields: { name } }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);
  const payerNameValues = selectifyRefdata(
    useOARefdata('Payer.PayerName')
  );

  return (
    <>
      {items.map((payer, index) => {
        return (
          <Row
            key={payer + index}
            data-testid={`PayersFieldArray[${index}]`}
          >
            <Col xs={3}>
              <Field
                autoFocus={!payer.id}
                component={Select}
                dataOptions={[{ value: '', label: '' }, ...payerNameValues]}
                label={
                  <FormattedMessage id="ui-oa.charge.payer" />
                }
                name={`${name}[${index}].payerName.id`}
                required
                validate={requiredValidator}
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                label={
                  <FormattedMessage id="ui-oa.charge.payerAmount" />
                }
                name={`${name}[${index}].payerAmount`}
                required
                type="number"
                validate={requiredValidator}
              />
            </Col>
            <Col xs={5}>
              <Field
                component={TextArea}
                label={
                  <FormattedMessage id="ui-oa.charge.payerNote" />
                }
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
      <Button onClick={() => onAddField({})}>
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
  return (
    <FieldArray component={PayersField} name="payers" />
  );
};

export default PayersFieldArray;
