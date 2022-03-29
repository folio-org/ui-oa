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
  Label,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

const OtherEmailsField = ({ fields: { name } }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);

  return (
    <>
      <Label>
        <FormattedMessage id="ui-oa.otherEmail.otherEmailAddresses" />
      </Label>
      {items.map((email, index) => {
        return (
          <Row key={email} start="xs">
            <Col xs={9}>
              <Field
                component={TextField}
                name={`${name}[${index}].email`}
                required
                validate={requiredValidator}
              />
            </Col>
            <Col xs={3}>
              <IconButton
                icon="trash"
                onClick={() => onDeleteField(index, email)}
              />
            </Col>
          </Row>
        );
      })}
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-oa.otherEmail.addEmailAddress" />
      </Button>
    </>
  );
};

OtherEmailsField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const OtherEmailsFieldArray = () => {
  return <FieldArray component={OtherEmailsField} name="alternateEmails" />;
};

export default OtherEmailsFieldArray;
