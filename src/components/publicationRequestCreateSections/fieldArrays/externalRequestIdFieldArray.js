import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  TextField,
  Row,
} from '@folio/stripes/components';

const ExternalRequestIdFieldArray = () => {
  const renderExternalRequestId = (fields) => {
    return (
      <div>
        {fields.map((externalRequestId, index) => (
          <Row middle="xs" key={externalRequestId}>
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.externalRequestId.externalRequestId" />}
                name={`${externalRequestId}.externalRequestId`}
              />
            </Col>
            <Col xs={9}>
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
      <div></div>
    )
  };

  return (
    <FieldArray name="externalRequestId">
      {({ fields }) => (
        <div>
          <div>
            {fields.length ? renderExternalRequestId(fields) : renderEmpty()}
          </div>
          <Button
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-oa.publicationRequest.addExternalRequestId" />
          </Button>
        </div>
      )}
    </FieldArray>)
};

export default ExternalRequestIdFieldArray;
