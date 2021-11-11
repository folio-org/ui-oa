import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Layout,
  Row,
  Select
} from '@folio/stripes/components';
import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdataValues';

const renderFunders = (fields, fundersValues, aspectFundedValues) => {
  return (
    <div>
      {fields.map((name, index) => (
        <Row key={name} middle="xs">
          <Col xs={3}>
            <Field
              component={Select}
              dataOptions={[{ value: '', label: '' }, ...aspectFundedValues]}
              label={<FormattedMessage id="ui-oa.publicationRequest.aspectFunded" />}
              name={`${name}.aspectFunded.id`}
            />
          </Col>
          <Col xs={3}>
            <Field
              component={Select}
              dataOptions={[{ value: '', label: '' }, ...fundersValues]}
              label={<FormattedMessage id="ui-oa.publicationRequest.funder" />}
              name={`${name}.funder.id`}
            />
          </Col>
          <Col xs={6}>
            <IconButton
              icon="trash"
              onClick={() => fields.remove(index)}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const renderEmpty = () => {
  return (
    <Layout className="padding-bottom-gutter">
      <FormattedMessage id="ui-oa.funders.requestHasNone" />
    </Layout>);
};

const [
  NAME,
  ASPECT_FUNDED
] = [
  'Funder.Name',
  'Funder.AspectFunded'
];

const FundingFieldArray = () => {
  const funderRefdataValues = useOARefdata([NAME, ASPECT_FUNDED]);

  const fundersValues = selectifyRefdata(funderRefdataValues, NAME);
  const aspectFundedValues = selectifyRefdata(funderRefdataValues, ASPECT_FUNDED);

  return (
    <FieldArray name="funding">
      {({ fields }) => (
        <div>
          <div>
            {fields.length ? renderFunders(fields, fundersValues, aspectFundedValues) : renderEmpty()}
          </div>
          <Button
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-oa.funders.addFunding" />
          </Button>
        </div>
      )}
    </FieldArray>
  );
};

export default FundingFieldArray;
