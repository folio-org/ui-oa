import { useState, useEffect } from 'react';
import { get } from 'lodash';

import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Row,
  Card,
  Select,
  Tooltip,
  InfoPopover,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

import { InstanceIdentifiersFieldArray } from '..';
import useOARefdata from '../../../../util/useOARefdata';

// TODO: This and InstanceIdentifiersFieldArray requires refactoring
const InstancesFieldArray = () => {
  const { values } = useFormState();
  const [optionsInUse, setOptionsInUse] = useState([]);
  const subTypeRefdataValues = useOARefdata('TitleInstance.SubType');
  // Sets the options that are currently being used by getting the namespace value of all identifiers
  useEffect(() => {
    setOptionsInUse(
      values?.instances?.map((i) => i?.subType).filter((x) => !!x)
    );
  }, [values]);

  const renderInstance = (fields) => {
    return (
      <>
        {fields.map((instanceId, index) => {
          // This removes the options that are currently in use from the total data option pool
          // This excludes the one that has been selected for the current field and the empty string value, so the field can be cleared
          const availableOptions = subTypeRefdataValues.filter(
            (data) => !optionsInUse?.includes(data.value) ||
              data.value === get(values, instanceId)?.subType ||
              data.value === ' '
          );
          return (
            <div key={instanceId} data-testid={`instancesFieldArray[${index}]`}>
              <Card
                headerEnd={
                  fields.length !== 1 && (
                    <Col xs={9}>
                      <Tooltip
                        id={`${instanceId}-trash-button-tooltip`}
                        text={
                          <FormattedMessage
                            id="ui-oa.journal.deleteInstance"
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
                            onClick={() => fields.remove(index)}
                          />
                        )}
                      </Tooltip>
                    </Col>
                  )
                }
                headerStart={
                  <strong>
                    <FormattedMessage
                      id="ui-oa.journal.instanceIndex"
                      values={{
                        index: index + 1,
                      }}
                    />
                  </strong>
                }
                roundedBorder
              >
                <Row>
                  <Col xs={4}>
                    <Field
                      component={Select}
                      dataOptions={[
                        { value: '', label: '' },
                        ...availableOptions,
                      ]}
                      id="journal-instance-subType"
                      label={
                        <>
                          <InfoPopover
                            content={
                              <FormattedMessage id="ui-oa.journal.subtypePopover" />
                            }
                          />

                          <FormattedMessage id="ui-oa.journal.instance.subtype" />
                        </>
                      }
                      name={`${instanceId}.subType`}
                      required
                      validate={requiredValidator}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <InstanceIdentifiersFieldArray instanceId={instanceId} />
                  </Col>
                </Row>
              </Card>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <FieldArray name="instances">
        {({ fields }) => (
          <>
            {fields.length > 0 && renderInstance(fields)}
            <Button
              disabled={fields?.length === subTypeRefdataValues?.length}
              onClick={() => fields.push({})}
            >
              <FormattedMessage id="ui-oa.journal.addInstance" />
            </Button>
          </>
        )}
      </FieldArray>
    </>
  );
};

export default InstancesFieldArray;
