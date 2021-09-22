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
      <div>
        {fields.map((otherEmail, index) => (
          <Row key={otherEmail} middle="xs">
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.otherEmail.otherEmailAddress" />}
                name={`${name}.otherEmail`}
              />
            </Col>
            <Col xs={9}>
              <IconButton
                icon="trash"
                onClick={() => fields.remove(index)}
              />
            </Col>
          </Row>
        ))}
      </div>
    );
  };

  const renderEmpty = () => {
    return (
      <div />
    );
  };

  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <div>
          <div>
            {fields.length ? renderOtherEmail(fields) : renderEmpty()}
          </div>
          <Button
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-oa.publicationRequest.addOtherEmail" />
          </Button>
        </div>
      )}
    </FieldArray>);
};

OtherEmailFieldArray.propTypes = propTypes;

export default OtherEmailFieldArray;
