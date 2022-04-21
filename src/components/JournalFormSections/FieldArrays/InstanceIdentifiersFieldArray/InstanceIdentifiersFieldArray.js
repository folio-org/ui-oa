import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  TextField,
  Row,
  Select,
  Tooltip,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

const propTypes = {
  instanceId: PropTypes.string.isRequired,
};

const InstanceIdentifiersFieldArray = ({ instanceId }) => {
  const intl = useIntl();
  const renderIdentifier = (fields) => {
    return (
      <>
        {/* This correctly renders the initial values of a new journal form */}
        {fields.length < 1 && fields.update()}
        {fields.map((identifierId, index) => (
          <div
            key={identifierId}
            data-testid={`InstanceIdentifiersFieldArray[${index}]`}
          >
            <Row middle="xs">
              <Col xs={4}>
                <Field
                  component={Select}
                  dataOptions={[
                    { value: '', label: '' },
                    {
                      value: 'issn',
                      label: intl.formatMessage({
                        id: 'ui-oa.journal.instance.identifier.ns.issn',
                      }),
                    },
                    {
                      value: 'ezb',
                      label: intl.formatMessage({
                        id: 'ui-oa.journal.instance.identifier.ns.ezb',
                      }),
                    },
                    {
                      value: 'zdb',
                      label: intl.formatMessage({
                        id: 'ui-oa.journal.instance.identifier.ns.zdb',
                      }),
                    },
                  ]}
                  label={
                    <FormattedMessage id="ui-oa.journal.instance.identifier.nameSpace" />
                  }
                  name={`${identifierId}.ns`}
                  required
                  validate={requiredValidator}
                />
              </Col>
              <Col xs={4}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.journal.instance.identifier.id" />
                  }
                  name={`${identifierId}.id`}
                  required
                  validate={requiredValidator}
                />
              </Col>
              {fields.length !== 1 && (
                <Col xs={4}>
                  <Tooltip
                    id={`${identifierId}-trash-button-tooltip`}
                    text={
                      <FormattedMessage
                        id="ui-oa.journal.deleteIdentifier"
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
                        onClick={() => fields.remove(index)}
                      />
                    )}
                  </Tooltip>
                </Col>
              )}
            </Row>
          </div>
        ))}
      </>
    );
  };

  return (
    <FieldArray name={`${instanceId}.ids`}>
      {({ fields }) => (
        <>
          <>{renderIdentifier(fields)}</>
          <Button onClick={() => fields.push({})}>
            <FormattedMessage id="ui-oa.journal.instance.identifier.addIdentifier" />
          </Button>
        </>
      )}
    </FieldArray>
  );
};

InstanceIdentifiersFieldArray.propTypes = propTypes;

export default InstanceIdentifiersFieldArray;
