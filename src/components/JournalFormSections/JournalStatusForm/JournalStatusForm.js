import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Col, Row, Select } from '@folio/stripes/components';

import { useOARefdata, selectifyRefdata } from '../../../util';

const [YES_NO, OA_STATUS] = ['Global.Yes_No', 'Work.OaStatus'];

const JournalStatusForm = () => {
  const refdataValues = useOARefdata([YES_NO, OA_STATUS]);
  const yesNoValues = selectifyRefdata(refdataValues, YES_NO);
  const oaStatusValues = selectifyRefdata(refdataValues, OA_STATUS);
  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            autoFocus
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
    </>
  );
};

export default JournalStatusForm;
