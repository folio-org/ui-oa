import { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash';

import { Field, useFormState } from 'react-final-form';
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
import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';
import { MAX_CHAR_LONG } from '../../../../constants/config';

const propTypes = {
  instanceId: PropTypes.string.isRequired,
};

const InstanceIdentifiersFieldArray = ({ instanceId }) => {
  const { values } = useFormState();
  const intl = useIntl();
  const [optionsInUse, setOptionsInUse] = useState([]);
  const [hasSubtype, setHasSubtype] = useState(false);

  // Sets the options that are currently being used by getting the namespace value of all identifiers
  useEffect(() => {
    if (get(values, instanceId)?.subType) {
      setHasSubtype(true);
    }
    setOptionsInUse(
      get(values, `${instanceId}.ids`)
        ?.map((i) => i?.ns)
        .filter((x) => !!x)
    );
  }, [instanceId, values]);

  const dataOptions = [
    { value: ' ', label: ' ' },
    {
      value: 'issn',
      label: intl.formatMessage({
        id: 'ui-oa.journal.instance.identifier.ns.issn',
      }),
    },
    {
      value: 'zdb',
      label: intl.formatMessage({
        id: 'ui-oa.journal.instance.identifier.ns.zdb',
      }),
    },
    {
      value: 'ezb',
      label: intl.formatMessage({
        id: 'ui-oa.journal.instance.identifier.ns.ezb',
      }),
      disabled: get(values, instanceId)?.subType !== 'electronic',
    },
  ];

  const renderIdentifier = (fields) => {
    return (
      <>
        {/* This correctly renders the initial values of a new journal form */}
        {fields.length < 1 && fields.update()}
        {fields?.map((identifierId, index) => {
          // This removes the options that are currently in use from the total data option pool
          // This excludes the one that has been selected for the current field and the empty string value, so the field can be cleared
          const availableOptions = dataOptions.filter(
            (data) => !optionsInUse?.includes(data.value) ||
              data.value === get(values, identifierId).ns ||
              data.value === ' '
          );

          // Validate all fields to ensure that EZB is only used within electronic subtype
          const validateCorrectSubtype = (value, allValues) => {
            const subType = get(allValues, instanceId)?.subType;
            return value === 'ezb' && subType !== 'electronic' ? (
              <FormattedMessage id="ui-oa.journal.validate.notElectronicSubtype" />
            ) : undefined;
          };

          const validateDuplicateIdentifier = (value, allValues) => {
            // Creates an object of the current ns and id of the field to be validated
            const match = { ns: get(allValues, identifierId)?.ns, id: value };
            const matchingIds = [];
            // Then goes through all other instances and identifiers to find if an already existing ns/id combo exists
            // If it does, then it will through a validation error
            allValues?.instances?.forEach((instance) => {
              instance?.ids?.forEach((id) => {
                if (isEqual(id, match)) {
                  matchingIds.push(id);
                }
              });
            });
            // Since the curent cobination should be the only existing combination
            // If the array length contains more than one, it return a validation error
            return matchingIds.length > 1 ? (
              <FormattedMessage id="ui-oa.journal.validate.duplicateNamespaceID" />
            ) : undefined;
          };

          return (
            <div
              key={identifierId}
              data-testid={`InstanceIdentifiersFieldArray[${index}]`}
            >
              <Row>
                <Col xs={4}>
                  <Field
                    component={Select}
                    dataOptions={availableOptions}
                    disabled={!hasSubtype}
                    label={
                      <FormattedMessage id="ui-oa.journal.instance.identifier.nameSpace" />
                    }
                    name={`${identifierId}.ns`}
                    required
                    validate={composeValidators(
                      requiredValidator,
                      validateCorrectSubtype
                    )}
                  />
                </Col>
                <Col xs={4}>
                  <Field
                    component={TextField}
                    disabled={!hasSubtype}
                    label={
                      <FormattedMessage id="ui-oa.journal.instance.identifier.id" />
                    }
                    maxLength={MAX_CHAR_LONG}
                    name={`${identifierId}.id`}
                    required
                    validate={composeValidators(
                      requiredValidator,
                      validateDuplicateIdentifier
                    )}
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
                          style={{ 'padding-top': '25px' }}
                        />
                      )}
                    </Tooltip>
                  </Col>
                )}
              </Row>
            </div>
          );
        })}
      </>
    );
  };

  // The button to add more identifiers is disabled when all avaialble options
  // for namespaces have been used
  return (
    <FieldArray name={`${instanceId}.ids`}>
      {({ fields }) => (
        <>
          <>{renderIdentifier(fields)}</>
          <Button
            disabled={
              !hasSubtype ||
              (get(values, instanceId)?.subType === 'print' &&
                get(values, instanceId)?.ids.length === 2) ||
              get(values, instanceId)?.ids.length === 3
            }
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-oa.journal.instance.identifier.addIdentifier" />
          </Button>
        </>
      )}
    </FieldArray>
  );
};

InstanceIdentifiersFieldArray.propTypes = propTypes;

export default InstanceIdentifiersFieldArray;
