import { FormattedMessage } from 'react-intl';
import { useFormState } from 'react-final-form';
import PropTypes from 'prop-types';

import {
  Button,
  IconButton,
  Pane,
  PaneFooter,
  Paneset,
  PaneMenu,
  HasCommand,
  checkScope,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import {
  PartyInfoForm,
  OtherEmailsFieldArray,
  StreetAddress,
} from '../../PartyFormSections';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  party: PropTypes.object,
};

// TODO Replace StreetAddress with StreetAddresses when domain model supports multiple street addresses

const PartyForm = ({ handlers: { onClose, onSubmit }, party }) => {
  const { pristine, submitting } = useFormState();

  const renderPaneTitle = () => (party ? (
    <FormattedMessage id="ui-oa.party.editPerson" />
    ) : (
      <FormattedMessage id="ui-oa.party.newPerson" />
    ));

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

  const shortcuts = [
    {
      name: 'save',
      handler: onSubmit,
    },
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Paneset>
        <Pane
          appIcon={<AppIcon app="oa" iconKey="party" size="small" />}
          centerContent
          defaultWidth="100%"
          firstMenu={renderFirstMenu()}
          footer={renderPaneFooter()}
          id="pane-oa-party-form"
          paneTitle={renderPaneTitle()}
        >
          <PartyInfoForm />
          {/* <StreetAddressesFieldArray /> */}
          <OtherEmailsFieldArray />
          <StreetAddress />
        </Pane>
      </Paneset>
    </HasCommand>
  );
};

PartyForm.propTypes = propTypes;

export default PartyForm;
