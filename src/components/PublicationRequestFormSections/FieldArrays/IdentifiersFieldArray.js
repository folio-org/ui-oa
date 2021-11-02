import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Layout,
  Select,
  TextField,
  Row,
} from '@folio/stripes/components';
import { useRefdata } from '@k-int/stripes-kint-components';

const IdentifiersFieldArray = () => {
  const { 0: { values: identifierTypeValues = [] } = {} } = useRefdata({ desc: 'PublicationIdentifier.Type', endpoint: 'oa/refdata' });

  const renderIdentifiers = (fields) => {
    return (
      <div>
        {fields.map((identifier, index) => (
          <Row key={identifier} middle="xs">
            <Col xs={3}>
              <Field
                component={Select}
                dataOptions={[{ value: '', label: '' }, ...identifierTypeValues]}
                label={<FormattedMessage id="ui-oa.identifiers.type" />}
                name={`${identifier}.type.value`}
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.identifiers.identifier" />}
                name={`${identifier}.publicationIdentifier`}
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
        <FormattedMessage id="ui-oa.identifiers.requestHasNone" />
      </Layout>);
  };

  return (
    <FieldArray name="identifiers">
      {({ fields }) => (
        <div>
          <div>
            {fields.length ? renderIdentifiers(fields) : renderEmpty()}
          </div>
          <Button
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-oa.identifiers.addIdentifier" />
          </Button>
        </div>
      )}
    </FieldArray>);
};

export default IdentifiersFieldArray;
