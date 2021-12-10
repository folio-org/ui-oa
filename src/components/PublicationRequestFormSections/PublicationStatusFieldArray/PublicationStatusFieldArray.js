<<<<<<< HEAD:src/components/PublicationRequestFormSections/FieldArrays/PublicationStatusFieldArray.js
import React from 'react';
=======
import PropTypes from 'prop-types';
>>>>>>> master:src/components/PublicationRequestFormSections/PublicationStatusFieldArray/PublicationStatusFieldArray.js
import { FormattedMessage } from 'react-intl';

import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  Datepicker,
  IconButton,
  Row,
  Select,
  TextArea,
} from '@folio/stripes/components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';


const PublicationStatusField = ({ fields: { name } }) => {
  const {
    items,
    onAddField,
    onDeleteField
  } = useKiwtFieldArray(name);
  const statusValues = selectifyRefdata(useOARefdata('PublicationStatus.PublicationStatus'));

<<<<<<< HEAD:src/components/PublicationRequestFormSections/FieldArrays/PublicationStatusFieldArray.js
  const renderPublicationStatus = (fields) => {
    return (
      <div>
        {fields.map((publicationStatus, index) => (
          <Row key={`publicationStatus[${index}]`} start="xs">
=======
  return (
    <>
      {items.map((publicationStatus, index) => {
        return (
          <Row key={publicationStatus} start="xs">
>>>>>>> master:src/components/PublicationRequestFormSections/PublicationStatusFieldArray/PublicationStatusFieldArray.js
            <Col xs={3}>
              <Field
                autoFocus
                component={Select}
                dataOptions={[{ value: '', label: '' }, ...statusValues]}
                label={<FormattedMessage id="ui-oa.publicationRequest.publicationStatus" />}
                name={`${name}[${index}].publicationStatus.id`}
              />
            </Col>
            <Col xs={3}>
              <Field
                backendDateStandard="YYYY-MM-DD"
                component={Datepicker}
                label={<FormattedMessage id="ui-oa.publicationStatus.publicationStatusDate" />}
                name={`${name}[${index}].statusDate`}
                timeZone="UTC"
              />
            </Col>
            <Col xs={5}>
              <Field
                component={TextArea}
                label={<FormattedMessage id="ui-oa.publicationStatus.publicationStatusNote" />}
                name={`${name}[${index}].statusNote`}
              />
            </Col>
            <Col xs={1}>
              <IconButton
                icon="trash"
                onClick={() => onDeleteField(index, publicationStatus)}
              />
            </Col>
          </Row>
        );
      })}
      <Button
        onClick={() => onAddField({})}
      >
        <FormattedMessage id="ui-oa.publicationStatus.addPublicationStatus" />
      </Button>
    </>
  );
};

PublicationStatusField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string
  })
};

const PublicationStatusFieldArray = () => {
  return (
    <FieldArray
      component={PublicationStatusField}
      name="publicationStatuses"
    />
  );
};

export default PublicationStatusFieldArray;
