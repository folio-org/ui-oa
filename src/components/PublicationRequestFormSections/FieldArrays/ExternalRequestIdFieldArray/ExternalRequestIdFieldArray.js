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
  Tooltip,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

const ExternalRequestIdField = ({ fields: { name } }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);
  return (
    <>
      {items.map((externalRequestId, index) => {
        return (
          <div
            key={externalRequestId + index}
            data-testid={`externalRequestIdFieldArray[${index}]`}
          >
            <Row middle="xs">
              <Col xs={3}>
                <Field
                  autoFocus={!externalRequestId?.id}
                  component={TextField}
                  label={
                    <FormattedMessage id="ui-oa.externalRequestId.externalRequestId" />
                  }
                  name={`${name}[${index}].externalId`}
                  required
                  validate={requiredValidator}
                />
              </Col>
              <Col xs={9}>
                <Tooltip
                  text={
                    <FormattedMessage
                      id="ui-oa.publicationRequest.removeExternalRequestIdIndex"
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
                      onClick={() => onDeleteField(index, externalRequestId)}
                    />
                  )}
                </Tooltip>
              </Col>
            </Row>
          </div>
        );
      })}
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-oa.publicationRequest.addExternalRequestId" />
      </Button>
    </>
  );
};

ExternalRequestIdField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const ExternalRequestIdFieldArray = () => {
  return (
    <FieldArray component={ExternalRequestIdField} name="externalRequestIds" />
  );
};

export default ExternalRequestIdFieldArray;
