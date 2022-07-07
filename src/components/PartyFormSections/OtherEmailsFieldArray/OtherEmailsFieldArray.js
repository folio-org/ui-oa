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
  Tooltip,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';
import { MAX_CHAR_SHORT } from '../../../constants/config';

const OtherEmailsField = ({ fields: { name } }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);

  return (
    <>
      <Label>
        <FormattedMessage id="ui-oa.otherEmail.otherEmailAddresses" />
      </Label>
      <br />
      {items.map((email, index) => {
        return (
          <Row key={email}>
            <Col xs={9}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.party.emailAddress" />}
                maxLength={MAX_CHAR_SHORT}
                name={`${name}[${index}].email`}
                required
                validate={requiredValidator}
              />
            </Col>
            <Col xs={3}>
              <Tooltip
                id={`other-email-${index + 1}-trash-button-tooltip`}
                text={
                  <FormattedMessage
                    id="ui-oa.publicationRequest.removeOtherEmailIndex"
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
                    onClick={() => onDeleteField(index, email)}
                    style={{ 'paddingTop': '25px' }}
                  />
                )}
              </Tooltip>
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
  return (
    <Row>
      <Col xs={12}>
        <FieldArray component={OtherEmailsField} name="alternateEmails" />
      </Col>
    </Row>
  );
};

export default OtherEmailsFieldArray;
