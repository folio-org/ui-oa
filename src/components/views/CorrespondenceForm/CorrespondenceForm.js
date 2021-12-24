import { FormattedMessage } from 'react-intl';

import { Button, Pane, PaneFooter, Paneset } from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';
import PropTypes from 'prop-types';
import { CorrespondenceInfoForm } from '../../CorrespondenceFormSections';


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
        id="pane.oa.correspondance.form"
        paneTitle={<FormattedMessage id="ui-oa.correspondence.new" />}
      >
        <CorrespondenceInfoForm />
      </Pane>
    </Paneset>
  );
};

CorrespondenceForm.propTypes = propTypes;

export default CorrespondenceForm;
