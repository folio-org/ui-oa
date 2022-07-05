import PropTypes from 'prop-types';
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
  Tooltip,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import useOARefdata from '../../../../util/useOARefdata';
import selectifyRefdata from '../../../../util/selectifyRefdata';
import { MAX_CHAR_LONG } from '../../../../constants/config';

const PublicationStatusField = ({ fields: { name } }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);
  const statusValues = selectifyRefdata(
    useOARefdata('PublicationStatus.PublicationStatus')
  );

  return (
    <>
      {items.map((publicationStatus, index) => {
        return (
          <Row
            key={publicationStatus + index}
            data-testid={`PublicationStatusFieldArray[${index}]`}
          >
            <Col xs={3}>
              <Field
                autoFocus={!publicationStatus.id}
                component={Select}
                dataOptions={[{ value: '', label: '' }, ...statusValues]}
                label={
                  <FormattedMessage id="ui-oa.publicationRequest.publicationStatus" />
                }
                name={`${name}[${index}].publicationStatus.id`}
                required
                validate={requiredValidator}
              />
            </Col>
            <Col xs={3}>
              <Field
                backendDateStandard="YYYY-MM-DD"
                component={Datepicker}
                label={
                  <FormattedMessage id="ui-oa.publicationRequest.statusDate" />
                }
                name={`${name}[${index}].statusDate`}
                required
                timeZone="UTC"
                validate={requiredValidator}
              />
            </Col>
            <Col xs={5}>
              <Field
                component={TextArea}
                label={
                  <FormattedMessage id="ui-oa.publicationRequest.statusNote" />
                }
                maxLength={MAX_CHAR_LONG}
                name={`${name}[${index}].statusNote`}
              />
            </Col>
            <Col xs={1}>
              <Tooltip
                id={`publication-status-${index + 1}-trash-button-tooltip`}
                text={
                  <FormattedMessage
                    id="ui-oa.publicationStatus.removePublicationStatusIndex"
                    values={{ index: index + 1 }}
                  />
                }
              >
                {({ ref, ariaIds }) => (
                  <IconButton
                    ref={ref}
                    aria-describedby={ariaIds.sub}
                    aria-labelledby={ariaIds.text}
                    icon="trash"
                    onClick={() => onDeleteField(index, publicationStatus)}
                    style={{ 'paddingTop': '25px' }}
                  />
                )}
              </Tooltip>
            </Col>
          </Row>
        );
      })}
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-oa.publicationStatus.addPublicationStatus" />
      </Button>
    </>
  );
};

PublicationStatusField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const PublicationStatusFieldArray = () => {
  return (
    <FieldArray component={PublicationStatusField} name="publicationStatuses" />
  );
};

export default PublicationStatusFieldArray;
