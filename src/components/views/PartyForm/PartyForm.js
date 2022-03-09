import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { AppIcon } from '@folio/stripes/core';

import {
  Button,
  IconButton,
  Pane,
  PaneFooter,
  Paneset,
  PaneMenu,
  LoadingView
} from '@folio/stripes/components';

import PartyInfoForm from '../../PartyFormSections/PartyInfoForm/PartyInfoForm';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  pristine: PropTypes.bool,
  party: PropTypes.object,
  isLoading: PropTypes.bool,
  submitting: PropTypes.bool,
};

const PartyForm = ({
  handlers: { onClose, onSubmit },
  pristine,
  party,
  submitting,
  isLoading
}) => {
  const renderPaneTitle = () => (
    party ?
      <FormattedMessage id="ui-oa.party.editPerson" /> :
      <FormattedMessage id="ui-oa.party.createPerson" />
  );

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

  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-oa.party.closeForm">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-party-form-button"
              onClick={() => onClose()}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <Paneset>
      <Pane
        appIcon={<AppIcon />}
        centerContent
        defaultWidth="100%"
        firstMenu={renderFirstMenu()}
        footer={renderPaneFooter()}
        id="pane-oa-party-form"
        paneTitle={renderPaneTitle()}
      >
        <PartyInfoForm />
      </Pane>
    </Paneset>
  );
};

PartyForm.propTypes = propTypes;

export default PartyForm;
