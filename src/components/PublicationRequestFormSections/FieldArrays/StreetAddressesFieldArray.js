import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { EditCard } from '@folio/stripes-erm-components';

import { Button, Col, Layout, TextField, Row } from '@folio/stripes/components';

const propTypes = {
  name: PropTypes.string,
  section: PropTypes.string,
};

const StreetAddressesFieldArray = ({ name, section }) => {
  const renderStreetAddresses = (fields) => {
    return (
      <>
        {fields.map((streetAddress, index) => (
          <EditCard
            key={streetAddress}
            deleteButtonTooltipText={
              <FormattedMessage
                id="ui-oa.streetAddresses.removeStreetAddress"
                values={{ number: index + 1 }}
              />
            }
            header={
              <FormattedMessage
                id="ui-oa.streetAddresses.streetAddressTitle"
                values={{ number: index + 1 }}
              />
            }
            onDelete={index !== 0 ? () => fields.remove(index) : undefined}
          >
            <Row>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.addressType" />
                  }
                  name={`${name}.addressType`}
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.addressLine1" />
                  }
                  name={`${name}.addressLine1`}
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.addressLine2" />
                  }
                  name={`${name}.addressLine2`}
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={<FormattedMessage id="ui-oa.streetAddresses.city" />}
                  name={`${name}.city`}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.stateRegion" />
                  }
                  name={`${name}.stateRegion`}
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.postalCode" />
                  }
                  name={`${name}.postalCode`}
                />
              </Col>
              <Col xs={3}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.country" />
                  }
                  name={`${name}.country`}
                />
              </Col>
              <Col xs={3} />
            </Row>
          </EditCard>
        ))}
      </>
    );
  };

  const renderEmpty = () => {
    // N.B. object literal shorthand { section } == { section: section}
    const values = { section };
    return (
      <Layout className="padding-bottom-gutter">
        <FormattedMessage
          id="ui-oa.streetAddresses.requestHasNone"
          values={values}
        />
      </Layout>
    );
  };

  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <>
          <>{fields.length ? renderStreetAddresses(fields) : renderEmpty()}</>
          <Button onClick={() => fields.push({})}>
            <FormattedMessage id="ui-oa.streetAddresses.addStreetAddress" />
          </Button>
        </>
      )}
    </FieldArray>
  );
};

StreetAddressesFieldArray.propTypes = propTypes;

export default StreetAddressesFieldArray;
