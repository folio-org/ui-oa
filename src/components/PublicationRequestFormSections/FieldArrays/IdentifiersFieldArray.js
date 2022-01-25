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
import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';

const IdentifiersFieldArray = () => {
  const identifierTypeValues = selectifyRefdata(
    useOARefdata('PublicationIdentifier.Type')
  );

  const renderIdentifiers = (fields) => {
    return (
      <>
        {fields.map((identifier, index) => (
          <Row key={identifier} middle="xs">
            <Col xs={3}>
              <Field
                autoFocus={!fields.value[index].type?.id}
                component={Select}
                dataOptions={[
                  { value: '', label: '' },
                  ...identifierTypeValues,
                ]}
                label={<FormattedMessage id="ui-oa.identifiers.type" />}
                name={`${identifier}.type.id`}
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
              <IconButton icon="trash" onClick={() => fields.remove(index)} />
            </Col>
          </Row>
        ))}
      </>
    );
  };

  const renderEmpty = () => {
    return (
      <div />
    );
  };

  return (
    <FieldArray name="identifiers">
      {({ fields }) => (
        <>
          <>{fields.length ? renderIdentifiers(fields) : renderEmpty()}</>
          <Button onClick={() => fields.push({})}>
            <FormattedMessage id="ui-oa.identifiers.addIdentifier" />
          </Button>
        </>
      )}
    </FieldArray>
  );
};

export default IdentifiersFieldArray;
