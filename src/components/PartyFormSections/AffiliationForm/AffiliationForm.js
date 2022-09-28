import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import { Col, Row, TextField, Select } from '@folio/stripes/components';
import { MAX_CHAR_LONG } from '../../../constants/config';
import { useOARefdata, selectifyRefdata } from '../../../util';

const AffiliationForm = () => {
  const institutionLevel1Refdata = selectifyRefdata(useOARefdata('Party.institutionLevel1'));

  return (
    <Row>
      <Col xs={3}>
        <Field
          component={Select}
          dataOptions={[{ value: '', label: '' }, ...institutionLevel1Refdata]}
          id="party-institution-level-one"
          label={<FormattedMessage id="ui-oa.party.institutionLevelOne" />}
          name="institutionLevel1.id"
        />
      </Col>
      <Col xs={3}>
        <Field
          component={TextField}
          id="party-institution-level-two"
          label={<FormattedMessage id="ui-oa.party.institutionLevelTwo" />}
          maxLength={MAX_CHAR_LONG}
          name="institutionLevel2"
          parse={(v) => v}
        />
      </Col>
    </Row>
  );
};

export default AffiliationForm;
