import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  Datepicker,
  IconButton,
  Layout,
  Row,
  Select,
  TextArea,
} from '@folio/stripes/components';

import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';

const PublicationStatusFieldArray = () => {
  const statusValues = selectifyRefdata(useOARefdata('PublicationStatus.PublicationStatus'));

  const renderPublicationStatus = (fields) => {
    return (
      <div>
        {fields.map((publicationStatus, index) => (
          <Row key={publicationStatus} start="xs">
            <Col xs={3}>
              <Field
                component={Select}
                dataOptions={[{ value: '', label: '' }, ...statusValues]}
                label={<FormattedMessage id="ui-oa.publicationRequest.publicationStatus" />}
                name={`${publicationStatus}.publicationStatus.id`}
              />
            </Col>
            <Col xs={3}>
              <Field
                backendDateStandard="YYYY-MM-DD"
                component={Datepicker}
                label={<FormattedMessage id="ui-oa.publicationStatus.publicationStatusDate" />}
                name={`${publicationStatus}.statusDate`}
                timeZone="UTC"
              />
            </Col>
            <Col xs={5}>
              <Field
                component={TextArea}
                label={<FormattedMessage id="ui-oa.publicationStatus.publicationStatusNote" />}
                name={`${publicationStatus}.statusNote`}
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
    );
  };

  const renderEmpty = () => {
    return (
      <Layout className="padding-bottom-gutter">
        <FormattedMessage id="ui-oa.publicationStatus.requestHasNone" />
      </Layout>);
  };

  return (
    <FieldArray name="publicationStatuses">
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
    </FieldArray>);
};

export default PublicationStatusFieldArray;
