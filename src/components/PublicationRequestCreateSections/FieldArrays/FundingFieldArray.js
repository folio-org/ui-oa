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


const FundingFieldArray = () => {
  const renderFunders = (fields) => {
    return (
      <div>
        {/* TODO: Insert dataOptions */}
        {fields.map((name, index) => (
          <Row key={name} middle="xs">
            <Col xs={3}>
              <Field
                component={Select}
                dataOptions={['', { label:'1', value:'1' }, { label:'2', value:'2' }]}
                label={<FormattedMessage id="ui-oa.publicationRequest.aspectFunded" />}
                name={`${name}.aspectFunded`}
              />
            </Col>
            <Col xs={3}>
              <Field
                component={Select}
                dataOptions={['', { label:'1', value:'1' }, { label:'2', value:'2' }]}
                label={<FormattedMessage id="ui-oa.publicationRequest.funder" />}
                name={`${name}.funder`}
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

  return (
    <FieldArray name="funding">
      {({ fields }) => (
        <div>
          <div>
            {fields.length ? renderFunders(fields) : renderEmpty()}
          </div>
          <Button
            onClick={() => fields.push({})}
          >
            Add
          </Button>
        </div>
      )}
    </FieldArray>
  );
};

export default FundingFieldArray;
