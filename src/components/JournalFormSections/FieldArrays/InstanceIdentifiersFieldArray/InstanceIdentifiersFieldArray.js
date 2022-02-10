import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  TextField,
  Row,
} from '@folio/stripes/components';

const propTypes = {
    instanceId: PropTypes.string.isRequired,
  };

const InstanceIdentifiersFieldArray = ({ instanceId }) => {
  const renderIdentifier = (fields) => {
    return (
      <>
        {fields.map((identifierId, index) => (
          <div
            key={identifierId}
            data-testid={`InstanceIdentifiersFieldArray[${index}]`}
          >
            <Row middle="xs">
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.journal.instance.identifier.nameSpace" />
                  }
                  name={`${identifierId}.nameSpace`}
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.journal.instance.identifier.id" />
                  }
                  name={`${identifierId}.id`}
                />
              </Col>
              <Col xs={6}>
                <IconButton icon="trash" onClick={() => fields.remove(index)} />
              </Col>
            </Row>
          </div>
        ))}
      </>
    );
  };

  const renderEmpty = () => {
    return <div />;
  };

  return (
    <FieldArray name={`${instanceId}.ids`}>
      {({ fields }) => (
        <>
          <>{fields.length ? renderIdentifier(fields) : renderEmpty()}</>
          <Button onClick={() => fields.push({})}>
            <FormattedMessage id="ui-oa.journal.instance.identifier.addIdentifier" />
          </Button>
        </>
      )}
    </FieldArray>
  );
};

InstanceIdentifiersFieldArray.propTypes = propTypes;

export default InstanceIdentifiersFieldArray;
