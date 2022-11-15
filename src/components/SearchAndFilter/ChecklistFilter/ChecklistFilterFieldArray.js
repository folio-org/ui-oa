import PropTypes from 'prop-types';
import { useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Card,
  IconButton,
  Layout,
  Tooltip,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import ChecklistFilterField from './ChecklistFilterField';

const ChecklistFilterFieldArray = ({ checklistItems }) => {
  const {
    mutators: { push },
  } = useForm();

  return (
    <>
      <FieldArray name="filters">
        {({ fields }) => fields.map((name, index) => {
            return (
              <>
                <Card
                  key={`checklist-filter-card[${index}]`}
                  headerEnd={
                    fields?.length > 1 ? (
                      <Tooltip
                        id={`checklist-filter-card-delete-[${index}]-tooltip`}
                        text={
                          <FormattedMessage
                            id="ui-oa.checklistFilter.deleteFilterIndex"
                            values={{ number: index + 1 }}
                          />
                        }
                      >
                        {({ ref, ariaIds }) => (
                          <IconButton
                            ref={ref}
                            aria-labelledby={ariaIds.text}
                            icon="trash"
                            id={`checklist-filter-card-delete-[${index}]`}
                            onClick={() => fields.remove(index)}
                          />
                        )}
                      </Tooltip>
                    ) : null
                  }
                  headerStart={
                    <strong>
                      <FormattedMessage
                        id="ui-oa.checklistFilter.checklistFilterIndex"
                        values={{ number: index + 1 }}
                      />
                    </strong>
                  }
                  marginBottom0={index !== fields.length - 1}
                >
                  <ChecklistFilterField
                    checklistItems={checklistItems}
                    fields={fields}
                    index={index}
                    name={name}
                  />
                </Card>
                {index < fields.value.length - 1 && (
                  <Layout className="textCentered">
                    <FormattedMessage id="ui-oa.AND" />
                  </Layout>
                )}
              </>
            );
          })
        }
      </FieldArray>
      <Button onClick={() => push('filters', { rules: [{}] })}>
        <FormattedMessage id="ui-oa.checklistFilter.addFilter" />
      </Button>
    </>
  );
};

ChecklistFilterFieldArray.propTypes = {
  checklistItems: PropTypes.arrayOf(PropTypes.object),
};

export default ChecklistFilterFieldArray;
