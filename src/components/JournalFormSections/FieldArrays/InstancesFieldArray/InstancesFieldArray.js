import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Row,
  Card,
  Select,
  Tooltip,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

import { InstanceIdentifiersFieldArray } from '..';
import useOARefdata from '../../../../util/useOARefdata';

const InstancesFieldArray = () => {
  const subTypeRefdataValues = useOARefdata('TitleInstance.SubType');

  const renderInstance = (fields) => {
    return (
      <>
        {fields.map((instanceId, index) => (
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
            >
              <Row>
                <Col xs={4}>
                  <Field
                    component={Select}
                    dataOptions={[
                      { value: '', label: '' },
                      ...subTypeRefdataValues,
                    ]}
                    id="journal-instance-subType"
                    label={
                      <FormattedMessage id="ui-oa.journal.instance.subtype" />
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
        ))}
      </>
    );
  };

  return (
    <>
      <FieldArray name="instances">
        {({ fields }) => (
          <>
            {fields.length > 0 && renderInstance(fields)}
            <Button onClick={() => fields.push({})}>
              <FormattedMessage id="ui-oa.journal.addInstance" />
            </Button>
          </>
        )}
      </FieldArray>
    </>
  );
};

export default InstancesFieldArray;
