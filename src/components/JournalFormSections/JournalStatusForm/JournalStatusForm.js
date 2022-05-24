import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Col, Row, Select } from '@folio/stripes/components';

import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';

const [YES_NO, OA_STATUS] = ['Global.Yes_No', 'Work.OaStatus'];

const JournalStatusForm = () => {
  const refdataValues = useOARefdata([YES_NO, OA_STATUS]);
  const yesNoValues = selectifyRefdata(refdataValues, YES_NO, 'value');
  const oaStatusValues = selectifyRefdata(refdataValues, OA_STATUS, 'value');
  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...yesNoValues]}
            label={<FormattedMessage id="ui-oa.journal.inDOAJ" />}
            name="indexedInDOAJ.value"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...oaStatusValues]}
            label={<FormattedMessage id="ui-oa.journal.oaStatus" />}
            name="oaStatus.value"
          />
        </Col>
      </Row>
    </>
  );
};

export default JournalStatusForm;
