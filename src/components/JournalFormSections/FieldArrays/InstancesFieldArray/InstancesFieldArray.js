import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  TextField,
  Row,
  Card,
} from '@folio/stripes/components';

import { InstanceIdentifiersFieldArray } from '..';

const InstancesFieldArray = () => {
  const renderInstance = (fields) => {
    return (
      <>
        {fields.map((instanceId, index) => (
          <div key={instanceId} data-testid={`instancesFieldArray[${index}]`}>
            <Card>
              <Row middle="xs">
                <Col xs={3}>
                  <Field
                    component={TextField}
                    label={
                      <FormattedMessage id="ui-oa.journal.instance.subtype" />
                    }
                    name={`${instanceId}.subType`}
                  />
                </Col>
                <Col xs={9}>
                  <IconButton
                    icon="trash"
                    onClick={() => fields.remove(index)}
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

  const renderEmpty = () => {
    return <div />;
  };

  return (
    <>
      <FieldArray name="instances">
        {({ fields }) => (
          <>
            {fields.length ? renderInstance(fields) : renderEmpty()}
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
