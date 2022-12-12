import { Col, MultiSelection, Row, TextField } from '@folio/stripes/components';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { useOARefdata, selectifyRefdata } from '../../../util';
import { validateYear } from '../../../util/validators';

const [CHARGE_CATEGORY, CHARGE_STATUS] = [
  'Charge.Category',
  'Charge.ChargeStatus',
];

const ReportingChargeForm = () => {
  const refdataValues = useOARefdata([CHARGE_CATEGORY, CHARGE_STATUS]);

  const chargeStatusesValues = selectifyRefdata(
    refdataValues,
    CHARGE_STATUS,
    'value'
  );
  const chargeCategoriesValues = selectifyRefdata(
    refdataValues,
    CHARGE_CATEGORY,
    'value'
  );

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.report.paymentPeriod" />}
            name="paymentPeriod"
            type="number"
            validate={validateYear}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            component={MultiSelection}
            dataOptions={[...chargeCategoriesValues]}
            label={<FormattedMessage id="ui-oa.report.chargeCategories" />}
            name="chargeCategory"
          />
        </Col>
        <Col xs={6}>
          <Field
            component={MultiSelection}
            dataOptions={[...chargeStatusesValues]}
            label={<FormattedMessage id="ui-oa.report.chargeStatuses" />}
            name="chargeStatus"
          />
        </Col>
      </Row>
    </>
  );
};

export default ReportingChargeForm;
