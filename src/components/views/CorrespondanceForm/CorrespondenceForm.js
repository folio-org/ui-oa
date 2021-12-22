import { FormattedMessage } from "react-intl";

import { Button, Pane, PaneFooter, Paneset, Field, Row, Col, TextArea } from "@folio/stripes/components";

import { AppIcon } from '@folio/stripes/core';
import PropTypes from 'prop-types';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

const CorrespondenceForm = ({ handlers: { onClose, onSubmit }, pristine, submitting }) => {
  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <Button
            buttonStyle="primary mega"
            disabled={pristine || submitting}
            marginBottom0
            onClick={onSubmit}
            type="submit"
          >
            <FormattedMessage id="stripes-components.saveAndClose" />
          </Button>
        }
        renderStart={
          <Button
            buttonStyle="default mega"
            marginBottom0
            onClick={() => onClose()}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        }
      />
    );
  };

  return (
    <Paneset>
      <Pane
        appIcon={<AppIcon app="oa" />}
        centerContent
        defaultWidth="100%"
        footer={renderPaneFooter()}
        id="pane-oa-correspondance-form"
        paneTitle={<FormattedMessage id="ui-oa.correspondance.new" />}
      >
        <Row>
          <Col md={6} xs={12}>
            <Field
              component={TextArea}
              id="agreement-line-description"
              label={<FormattedMessage id="ui-oa.correspondence.description" />}
              maxLength={255}
              name="description"
              parse={v => v} // Lets us send an empty string instead of `undefined`
            />
          </Col>
        </Row>
      </Pane>
    </Paneset>
  );
};

CorrespondenceForm.propTypes = propTypes;

export default CorrespondenceForm;
