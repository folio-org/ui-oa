import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import { Col, Row, Select, TextField } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';
import { InstancesFieldArray } from '../FieldArrays';


const JournalInfoForm = () => {
  const intl = useIntl();

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
        <Col>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              {
                value: 'serial',
                label: intl.formatMessage({ id: 'ui-oa.journal.type.serial' }),
              },
            ]}
            id="journal-type"
            label={<FormattedMessage id="ui-oa.journal.type" />}
            name="type"
          />
        </Col>
      </Row>
      <InstancesFieldArray />
    </>
  );
};

export default JournalInfoForm;
