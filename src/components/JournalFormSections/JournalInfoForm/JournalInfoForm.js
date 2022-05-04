import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Col, Row, TextField, Select } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';
import { InstancesFieldArray } from '../FieldArrays';
import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';

const [YES_NO, OA_STATUS] = ['Global.Yes_No', 'Work.OaStatus'];

const JournalInfoForm = () => {
  const refdataValues = useOARefdata([YES_NO, OA_STATUS]);
  const yesNoValues = selectifyRefdata(refdataValues, YES_NO);
  const oaStatusValues = selectifyRefdata(refdataValues, OA_STATUS);
  return (
    <>
      <Row>
        <Col xs={12}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.journal.title" />}
            name="title"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...yesNoValues]}
            label={<FormattedMessage id="ui-oa.journal.inDOAJ" />}
            name="indexedInDOAJ.id"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...oaStatusValues]}
            label={<FormattedMessage id="ui-oa.journal.oaStatus" />}
            name="oaStatus.id"
          />
        </Col>
      </Row>
      <InstancesFieldArray />
    </>
  );
};

export default JournalInfoForm;
