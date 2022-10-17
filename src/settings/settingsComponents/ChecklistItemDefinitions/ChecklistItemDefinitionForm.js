import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  TextField,
  TextArea,
  KeyValue,
  InfoPopover,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

import { MAX_CHAR_LONG } from '../../../constants/config';

const propTypes = {
  definition: PropTypes.object,
};

const ChecklistItemDefinitionForm = ({ definition }) => {
  return (
    <>
      {!!definition && (
        <Row>
          <Col xs={12}>
            <KeyValue
              label={
                <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.name" />
              }
              value={definition?.name}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={6}>
          <Field
            component={TextField}
            label={
              <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.label" />
            }
            maxLength={MAX_CHAR_LONG}
            name="label"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            label={
              <>
                <InfoPopover
                  content={
                    <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.weightPopover" />
                  }
                />
                <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.weight" />
              </>
            }
            name="weight"
            required
            type="number"
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field
            component={TextArea}
            label={
              <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.description" />
            }
            name="description"
            parse={(v) => v}
          />
        </Col>
      </Row>
    </>
  );
};

ChecklistItemDefinitionForm.propTypes = propTypes;

export default ChecklistItemDefinitionForm;
