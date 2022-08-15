import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import { Col, Row, TextField, Select } from '@folio/stripes/components';
import { MAX_CHAR_LONG } from '../../../constants/config';
import { useOARefdata, selectifyRefdata } from '../../../util';

const AffiliationForm = () => {
  const facultyRefData = selectifyRefdata(useOARefdata('Party.Faculty'));

  return (
    <Row>
      <Col xs={3}>
        <Field
          component={Select}
          dataOptions={[{ value: '', label: '' }, ...facultyRefData]}
          id="party-faculty"
          label={<FormattedMessage id="ui-oa.party.institutionLevelOne" />}
          name="faculty.id"
        />
      </Col>
      <Col xs={3}>
        <Field
          component={TextField}
          id="party-department"
          label={<FormattedMessage id="ui-oa.party.institutionLevelTwo" />}
          maxLength={MAX_CHAR_LONG}
          name="department"
        />
      </Col>
    </Row>
  );
};

export default AffiliationForm;
