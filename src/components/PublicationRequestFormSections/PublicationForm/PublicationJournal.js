import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';

import {
  Col,
  Headline,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';

const [
  OA_STATUS
 ] = [
  'PublicationRequest.OaStatus'
];

const PublicationJournal = () => {
  const refdataValues = useOARefdata([
    OA_STATUS
  ]);

  const oaStatusValues = selectifyRefdata(refdataValues, OA_STATUS);


  return (
    <>
      <Row>
        <Col xs>
          <Headline margin="small" size="large" tag="h3">
            <FormattedMessage id="ui-oa.publicationRequest.journalDetails" />
          </Headline>
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={6}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.journalTitle" />}
            name="journalTitle"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.issnPrint" />}
            name="issnPrint"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.issnElectronic" />}
            name="issnElectronic"
          />
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...oaStatusValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.oaStatus" />}
            name="oaStatus.id"
          />
        </Col>
        <Col xs={9} />
      </Row>
    </>
  );
};

export default PublicationJournal;
