import { FormattedMessage } from 'react-intl';
import { useFormState } from 'react-final-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Button,
  Pane,
  PaneFooter,
  Paneset,
  PaneMenu,
  IconButton,
  HasCommand,
  checkScope,
  Card,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { JournalStatusForm } from '../../JournalFormSections';
import handleSaveKeyCommand from '../../../util/keyboardShortcutHandlers';
import { JournalDetails } from '../../PublicationRequestSections/PublicationType';
import urls from '../../../util/urls';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  journal: PropTypes.object,
};

const JournalForm = ({ handlers: { onClose, onSubmit }, journal }) => {
  const { pristine, submitting } = useFormState();

  const renderPaneTitle = () => (journal ? (
    <FormattedMessage
      id="ui-oa.journal.editJournal"
      values={{ title: journal?.title }}
    />
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
      handler: (e) => handleSaveKeyCommand(e, onSubmit, pristine, submitting),
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
          <Card
            cardStyle="positive"
            headerStart={
              <AppIcon app="oa" iconKey="journal" size="small">
                {journal?.id ? (
                  <Link to={urls.journal(journal.id)}>
                    <strong>{journal?.title}</strong>
                  </Link>
                ) : (
                  <strong>{journal?.title}</strong>
                )}
              </AppIcon>
            }
            roundedBorder
          >
            <JournalDetails isCard journal={journal} />
          </Card>
          <JournalStatusForm />
        </Pane>
      </Paneset>
    </HasCommand>
  );
};

JournalForm.propTypes = propTypes;

export default JournalForm;
