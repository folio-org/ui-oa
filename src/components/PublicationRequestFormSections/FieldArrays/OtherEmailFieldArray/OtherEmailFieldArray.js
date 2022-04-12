import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
  name: PropTypes.string,
};

const OtherEmailFieldArray = ({ name }) => {
  const renderOtherEmail = (fields) => {
    return (
      <>
        {fields.map((otherEmail, index) => (
          <Row key={otherEmail} middle="xs">
            <Col xs={3}>
              <Field
                component={TextField}
                label={
                  <FormattedMessage id="ui-oa.otherEmail.otherEmailAddress" />
                }
                name={`${name}.otherEmail`}
              />
            </Col>
            <Col xs={9}>
              <IconButton icon="trash" onClick={() => fields.remove(index)} />
            </Col>
          </Row>
        ))}
      </>
    );
  };

  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          <>{fields.length > 0 && renderOtherEmail(fields)}</>
          <Button onClick={() => fields.push({})}>
            <FormattedMessage id="ui-oa.publicationRequest.addOtherEmail" />
          </Button>
        </>
      )}
    </FieldArray>
  );
};

OtherEmailFieldArray.propTypes = propTypes;

export default OtherEmailFieldArray;
