import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Col, Row, TextField } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';
import { InstancesFieldArray } from '../FieldArrays';


const JournalInfoForm = () => {
  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.journal.title" />}
            name="title"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <InstancesFieldArray />
    </>
  );
};

export default JournalInfoForm;
