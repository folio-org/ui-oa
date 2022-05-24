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
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { JournalStatusForm } from '../../JournalFormSections';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  queryStates: PropTypes.shape({
    isLoading: PropTypes.bool,
    isSubmitting: PropTypes.bool,
  }),
  journal: PropTypes.object,
};

const JournalForm = ({
  handlers: { onClose, onSubmit },
  queryStates: { isLoading, isSubmitting },
  journal,
}) => {
  const { pristine } = useFormState();

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

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <Paneset>
      <Pane
        appIcon={<AppIcon app="oa" />}
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
  );
};

JournalForm.propTypes = propTypes;

export default JournalForm;
