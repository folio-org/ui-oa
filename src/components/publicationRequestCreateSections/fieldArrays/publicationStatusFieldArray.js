import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Layout,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

const PublicationStatusFieldArray = () => {
  const renderPublicationStatus = (fields) => {
    return (
      <div>
        {fields.map((publicationStatus, index) => (
          <Row key={publicationStatus}>
            <Col xs={3}>
              <Field
                component={Select}
                label={<FormattedMessage id="ui-oa.publicationRequest.publicationStatus" />}
                name={`${publicationStatus}.publicationStatus`}
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.publicationStatus.publicationStatusDate" />}
                name={`${publicationStatus}.publicationStatusDate`}
              />
            </Col>
            <Col xs={5}>
              <Field
                component={TextArea}
                label={<FormattedMessage id="ui-oa.publicationStatus.publicationStatusNote" />}
                name={`${publicationStatus}.publicationStatusNote`}
              />
            </Col>
            <Col xs={1}>
              <IconButton
                icon="trash"
                onClick={() => fields.remove(index)}
              />
            </Col>
          </Row>
        ))}
      </div>
    )
  }

  const renderEmpty = () => {
    return (
      <Layout className="padding-bottom-gutter">
        <FormattedMessage id="ui-oa.publicationStatus.requestHasNone" />
      </Layout>)
  }

  return (
    <FieldArray name="publicationStatus">
      {({ fields }) => (
        <div>
          <div>
            {fields.length ? renderPublicationStatus(fields) : renderEmpty()}
          </div>
          <Button
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-oa.publicationStatus.addPublicationStatus" />
          </Button>
        </div>
      )}
    </FieldArray>)
}

export default PublicationStatusFieldArray;