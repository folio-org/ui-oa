import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Col, Row, TextField, Select } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';
import { InstancesFieldArray } from '../FieldArrays';
import { useOARefdata, selectifyRefdata } from '../../../util';

const [YES_NO, OA_STATUS] = ['Global.Yes_No', 'Work.OaStatus'];

const JournalInfoForm = () => {
  const refdataValues = useOARefdata([YES_NO, OA_STATUS]);
  const yesNoValues = selectifyRefdata(refdataValues, YES_NO, 'value');
  const oaStatusValues = selectifyRefdata(refdataValues, OA_STATUS, 'value');
  return (
    <>
      <Row>
        <Col xs={12}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.journal.title" />}
            maxLength={2047}
            name="title"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...yesNoValues]}
            label={<FormattedMessage id="ui-oa.journal.inDOAJ" />}
            name="indexedInDOAJ"
          />
        </Col>
        <Col xs={4}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...oaStatusValues]}
            label={<FormattedMessage id="ui-oa.journal.oaStatus" />}
            name="oaStatus"
          />
        </Col>
      </Row>
      <InstancesFieldArray />
    </>
  );
};

export default JournalInfoForm;
