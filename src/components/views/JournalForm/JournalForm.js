import { FormattedMessage } from 'react-intl';
import { useFormState } from 'react-final-form';
import PropTypes from 'prop-types';

import {
  Button,
  Pane,
  PaneFooter,
  Paneset,
  PaneMenu,
  IconButton,
  LoadingView,
  HasCommand,
  checkScope,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { JournalStatusForm } from '../../JournalFormSections';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
  journal: PropTypes.object,
};

const JournalForm = ({
  handlers: { onClose, onSubmit },
  isLoading,
  journal,
}) => {
  const { pristine, submitting } = useFormState();

  const renderPaneTitle = () => (journal ? (
    <FormattedMessage id="ui-oa.journal.editJournal" />
    ) : (
      <FormattedMessage id="ui-oa.journal.newJournal" />
    ));

  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-oa.publicationRequest.closeForm">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-journal-form-button"
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

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Paneset>
        <Pane
          appIcon={<AppIcon app="oa" iconKey="journal" size="small" />}
          centerContent
          defaultWidth="100%"
          firstMenu={renderFirstMenu()}
          footer={renderPaneFooter()}
          id="pane-oa-journal-form"
          paneTitle={renderPaneTitle()}
        >
          <JournalStatusForm />
        </Pane>
      </Paneset>
    </HasCommand>
  );
};

JournalForm.propTypes = propTypes;

export default JournalForm;
