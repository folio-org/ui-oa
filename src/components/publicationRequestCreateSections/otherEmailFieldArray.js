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

const OtherEmailFieldArray = () => {
  const renderOtherEmail = (fields) => {
    return (
      <div>
        {fields.map((otherEmail, index) => (
          <Row middle="xs" key={otherEmail}>
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.otherEmail.otherEmailAddress" />}
                name={`${otherEmail}.otherEmail`}
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
    )
  }

  const renderEmpty = () => {
    return (
      <div></div>
    )
  }

  return (
    <FieldArray name="otherEmail">
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
    </FieldArray>)
}

export default OtherEmailFieldArray;