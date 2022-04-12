import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Row,
  Col,
  TextField,
  Datepicker,
  Select,
  TextArea,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';

const [CORRESPONDENCE_CATEGORY, CORRESPONDENCE_STATUS, CORRESPONDENCE_MODE] = [
  'Correspondence.Category',
  'Correspondence.Status',
  'Correspondence.Mode',
];

const CorrespondenceInfoForm = () => {
  const refdataValues = useOARefdata([
    CORRESPONDENCE_CATEGORY,
    CORRESPONDENCE_STATUS,
    CORRESPONDENCE_MODE,
  ]);

  const categoryValues = selectifyRefdata(
    refdataValues,
    CORRESPONDENCE_CATEGORY
  );
  const statusValues = selectifyRefdata(refdataValues, CORRESPONDENCE_STATUS);
  const modeValues = selectifyRefdata(refdataValues, CORRESPONDENCE_MODE);

  return (
    <>
      <Row start="xs">
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.correspondence.correspondent" />}
            maxLength={255}
            name="correspondent"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            label={
              <FormattedMessage id="ui-oa.correspondence.dateOfCorrespondence" />
            }
            name="dateOfCorrespondence"
            required
            timeZone="UTC"
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...statusValues]}
            id="correspondence-status"
            label={<FormattedMessage id="ui-oa.correspondence.status" />}
            name="status.id"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...modeValues]}
            id="correspondence-mode"
            label={<FormattedMessage id="ui-oa.correspondence.mode" />}
            name="mode.id"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...categoryValues]}
            id="correspondence-category"
            label={<FormattedMessage id="ui-oa.correspondence.category" />}
            name="category.id"
            parse={v => v}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field
            component={TextArea}
            fullWidth
            label={<FormattedMessage id="ui-oa.correspondence.description" />}
            name="content"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
    </>
  );
};
export default CorrespondenceInfoForm;
