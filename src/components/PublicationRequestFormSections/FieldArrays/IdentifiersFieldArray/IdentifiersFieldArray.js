import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Select,
  TextField,
  Row,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import useOARefdata from '../../../../util/useOARefdata';
import selectifyRefdata from '../../../../util/selectifyRefdata';

const IdentifiersField = ({ fields: { name } }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);
  const identifierTypeValues = selectifyRefdata(
    useOARefdata('PublicationIdentifier.Type')
  );

  return (
    <>
      {items.map((identifier, index) => {
        return (
          <Row key={identifier} middle="xs">
            <Col xs={3}>
              <Field
                autoFocus={!identifier?.id}
                component={Select}
                dataOptions={[
                  { value: '', label: '' },
                  ...identifierTypeValues,
                ]}
                label={<FormattedMessage id="ui-oa.identifiers.type" />}
                name={`${name}[${index}].type.id`}
                required
                validate={requiredValidator}
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.identifiers.identifier" />}
                name={`${name}[${index}].publicationIdentifier`}
                required
                validate={requiredValidator}
              />
            </Col>
            <Col xs={6}>
              <IconButton
                icon="trash"
                onClick={() => onDeleteField(index, identifier)}
              />
            </Col>
          </Row>
        );
      })}
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-oa.identifiers.addIdentifier" />
      </Button>
    </>
  );
};

IdentifiersField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const IdentifiersFieldArray = () => {
  return <FieldArray component={IdentifiersField} name="identifiers" />;
};

export default IdentifiersFieldArray;
