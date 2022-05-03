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
  LoadingView,
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
  queryStates: PropTypes.shape({
    isLoading: PropTypes.bool,
    isSubmitting: PropTypes.bool,
  }),
  party: PropTypes.object,
};

// TODO Replace StreetAddress with StreetAddresses when domain model supports multiple street addresses

const PartyForm = ({
  handlers: { onClose, onSubmit },
  queryStates: { isLoading, isSubmitting },
  party,
}) => {
  const { pristine } = useFormState();

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
            disabled={pristine || isSubmitting}
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
        <StreetAddress />
        {/* <StreetAddressesFieldArray /> */}
        <OtherEmailsFieldArray />
      </Pane>
    </Paneset>
  );
};

PartyForm.propTypes = propTypes;

export default PartyForm;
