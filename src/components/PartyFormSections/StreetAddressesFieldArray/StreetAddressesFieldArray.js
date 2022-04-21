import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  TextField,
  Row,
  Label,
  Card,
  Tooltip,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

const StreetAddressesField = ({ fields: { name } }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);

  return (
    <>
      <Label>
        <FormattedMessage id="ui-oa.party.streetAddresses" />
      </Label>
      {items.map((address, index) => {
        return (
          <div key={address}>
            <Card
              headerEnd={
                <Col xs={9}>
                  <Tooltip
                    id={`street-address-${index + 1}-trash-button-tooltip`}
                    text={
                      <FormattedMessage
                        id="ui-oa.party.streetAddress.delete"
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
                        onClick={() => onDeleteField(index, address)}
                      />
                    )}
                  </Tooltip>
                </Col>
              }
              headerStart={
                <strong>
                  <FormattedMessage
                    id="ui-oa.party.streetAddress.index"
                    values={{
                      index: index + 1,
                    }}
                  />
                </strong>
              }
            >
              <Row>
                <Col xs={3}>
                  <Field
                    component={TextField}
                    label={
                      <FormattedMessage id="ui-oa.party.streetAddress.name" />
                    }
                    name={`${name}[${index}].address.name`}
                  />
                </Col>
                <Col xs={3}>
                  <Field
                    component={TextField}
                    label={
                      <FormattedMessage id="ui-oa.party.streetAddress.addressLineOne" />
                    }
                    name={`${name}[${index}].address.addressLineOne`}
                  />
                </Col>
                <Col xs={3}>
                  <Field
                    component={TextField}
                    label={
                      <FormattedMessage id="ui-oa.party.streetAddress.addressLineTwo" />
                    }
                    name={`${name}[${index}].address.addressLineTwo`}
                  />
                </Col>
                <Col xs={3}>
                  <Field
                    component={TextField}
                    label={
                      <FormattedMessage id="ui-oa.party.streetAddress.city" />
                    }
                    name={`${name}[${index}].address.city`}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <Field
                    component={TextField}
                    label={
                      <FormattedMessage id="ui-oa.party.streetAddress.region" />
                    }
                    name={`${name}[${index}].address.region`}
                  />
                </Col>
                <Col xs={3}>
                  <Field
                    component={TextField}
                    label={
                      <FormattedMessage id="ui-oa.party.streetAddress.country" />
                    }
                    name={`${name}[${index}].address.country`}
                    required
                    validate={requiredValidator}
                  />
                </Col>
                <Col xs={3}>
                  <Field
                    component={TextField}
                    label={
                      <FormattedMessage id="ui-oa.party.streetAddress.postalCode" />
                    }
                    name={`${name}[${index}].address.postalCode`}
                    required
                    validate={requiredValidator}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        );
      })}
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-oa.party.streetAddress.add" />
      </Button>
    </>
  );
};

StreetAddressesField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const StreetAddressesFieldArray = () => {
  return (
    <Row>
      <Col xs={12}>
        <FieldArray component={StreetAddressesField} name="streetAddress" />
      </Col>
    </Row>
  );
};

export default StreetAddressesFieldArray;
