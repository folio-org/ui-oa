import { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';

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
import { requiredValidator } from '@folio/stripes-erm-components';
import { MAX_CHAR_LONG } from '../../../../constants/config';

const propTypes = {
  instanceId: PropTypes.string.isRequired,
};

const InstanceIdentifiersFieldArray = ({ instanceId }) => {
  const { values } = useFormState();
  const intl = useIntl();
  const [optionsInUse, setOptionsInUse] = useState([]);

  // Sets the options that are currently being used by getting the namespace value of all identifiers
  useEffect(() => {
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
                    maxLength={MAX_CHAR_LONG}
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
