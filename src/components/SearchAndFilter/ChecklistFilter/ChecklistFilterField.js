import PropTypes from 'prop-types';
import { Select, Button, Row, Col, Label } from '@folio/stripes/components';
import { Field, useForm, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { requiredValidator } from '@folio/stripes-erm-components';
import { FormattedMessage } from 'react-intl';
import ChecklistFilterRule from './ChecklistFilterRule';

const ChecklistFilterField = ({ checklistItems, index, name, fields }) => {
  const {
    change,
    mutators: { push },
  } = useForm();
  const { values } = useFormState();

  return (
    <>
      <Field
        id={`input-checklist-item-${index}`}
        label={<FormattedMessage id="ui-oa.checklistFilter.checklistItem" />}
        name={`${name}.checklistItem`}
        placeholder=" "
        render={(fieldProps) => {
          return (
            <Select {...fieldProps} placeholder={null}>
              <option value=""> </option>
              {checklistItems.map((v) => {
                return (
                  <option key={v.id} value={v.value}>
                    {v.label}
                  </option>
                );
              })}
            </Select>
          );
        }}
        required
        validate={requiredValidator}
      />
      <Row>
        <Col xs={2} />
        <Col xs={3}>
          <Label id="rule-column-header-attribute" required>
            <FormattedMessage id="ui-oa.checklistFilter.attribute" />
          </Label>
        </Col>
        <Col xs={3}>
          <Label id="rule-column-header-comparator" required>
            <FormattedMessage id="ui-oa.checklistFilter.comparator" />
          </Label>
        </Col>
        <Col xs={3}>
          <Label id="rule-column-header-value" required>
            <FormattedMessage id="ui-oa.checklistFilter.value" />
          </Label>
        </Col>
        <Col xs={1} />
      </Row>

      <FieldArray name={`${name}.rules`}>
        {({ fields: ruleFields }) => ruleFields.map((ruleFieldName, ruleFieldIndex) => (
          <ChecklistFilterRule
            key={ruleFieldName}
            ariaLabelledby={`selected-checklist-item-name-${index}`}
            clearRuleValue={() => change(`filters[${index}].rules[${ruleFieldIndex}].value`, '')
              }
            index={ruleFieldIndex}
            name={ruleFieldName}
            onDelete={() => ruleFields.remove(ruleFieldIndex)}
            value={values.filters[index]?.rules[ruleFieldIndex]}
          />
          ))
        }
      </FieldArray>
      <Button
        data-test-add-rule-btn
        disabled={!fields.value[index]?.checklistItem}
        onClick={() => push(`${name}.rules`)}
      >
        <FormattedMessage id="ui-oa.checklistFilter.addRule" />
      </Button>
    </>
  );
};

ChecklistFilterField.propTypes = {
  checklistItems: PropTypes.arrayOf(PropTypes.object),
  fields: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.string,
  name: PropTypes.string,
};

export default ChecklistFilterField;
