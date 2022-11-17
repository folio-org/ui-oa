/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Tooltip,
  IconButton,
  Layout,
  Select,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useOARefdata, selectifyRefdata } from '../../../util';

const ChecklistFilterRule = ({
  ariaLabelledby,
  index,
  name,
  onDelete,
  value,
}) => {
  const [CHECKLIST_ITEM_OUTCOME, CHECKLIST_ITEM_STATUS] = [
    'ChecklistItem.Outcome',
    'ChecklistItem.Status',
  ];
  const refdataValues = useOARefdata([
    CHECKLIST_ITEM_OUTCOME,
    CHECKLIST_ITEM_STATUS,
  ]);
  const outcomeValues = selectifyRefdata(
    refdataValues,
    CHECKLIST_ITEM_OUTCOME,
    'value'
  );
  const statusValues = selectifyRefdata(
    refdataValues,
    CHECKLIST_ITEM_STATUS,
    'value'
  );

  const operators = [
    { label: '', value: '' },
    { label: 'Is', value: '==' },
    { label: 'Is not', value: '!=' },
  ];

  const attributes = [
    { label: '', value: '' },
    { label: 'Outcome', value: 'outcome' },
    { label: 'Visibility', value: 'status' },
  ];

  return (
    <Row key={name}>
      <Col xs={2}>
        <Layout className="textCentered">
          {index === 0 ? null : <FormattedMessage id="ui-oa.OR" />}
        </Layout>
      </Col>
      <Col xs={3}>
        <Field name={`${name}.attribute`} validate={requiredValidator}>
          {({ input, meta }) => (
            <Select
              {...input}
              aria-labelledby={`${ariaLabelledby}-rule-column-header-attribute`}
              dataOptions={attributes}
              error={meta?.touched && meta?.error}
              required
            />
          )}
        </Field>
      </Col>
      <Col xs={3}>
        <Field name={`${name}.operator`} validate={requiredValidator}>
          {({ input, meta }) => (
            <Select
              {...input}
              aria-labelledby={`${ariaLabelledby}-rule-column-header-comparator`}
              dataOptions={
                value?.attribute === 'status'
                  ? [
                      { label: '', value: '' },
                      { label: 'Is', value: '==' },
                    ]
                  : operators
              }
              error={meta?.touched && meta?.error}
              required
            />
          )}
        </Field>
      </Col>
      <Col xs={3}>
        <Field name={`${name}.value`} validate={requiredValidator}>
          {({ input, meta }) => (
            <Select
              {...input}
              aria-labelledby={`${ariaLabelledby}-rule-column-header-value`}
              dataOptions={
                value?.attribute === 'outcome'
                  ? [
                      { label: '', value: '' },
                      { label: 'Not set', value: 'notSet' },
                      ...outcomeValues,
                    ]
                  : [{ label: '', value: '' }, ...statusValues]
              }
              disabled={!value?.attribute}
              error={meta?.touched && meta?.error}
              required
            />
          )}
        </Field>
      </Col>
      <Col xs={1}>
        {index ? (
          <Tooltip
            id={`delete-rule-btn-${index}`}
            text={
              <FormattedMessage
                id="ui-oa.checklistFilter.removeRule"
                values={{ number: index + 1 }}
              />
            }
          >
            {({ ref, ariaIds }) => (
              <IconButton
                ref={ref}
                aria-labelledby={ariaIds.text}
                icon="trash"
                onClick={onDelete}
              />
            )}
          </Tooltip>
        ) : null}
      </Col>
    </Row>
  );
};

ChecklistFilterRule.propTypes = {
  ariaLabelledby: PropTypes.string.isRequired,
  clearRuleValue: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  value: PropTypes.shape({
    operator: PropTypes.string,
    value: PropTypes.string,
  }),
};

export default ChecklistFilterRule;
