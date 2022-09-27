import { useState, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useIntlKeyStore } from '@k-int/stripes-kint-components';

import { AppContextMenu } from '@folio/stripes/core';

import {
  CommandList,
  importShortcuts,
  HasCommand,
  KeyboardShortcutsModal,
  checkScope,
  NavList,
  NavListItem,
  NavListSection,
} from '@folio/stripes/components';

import Settings from './settings';

import {
  PublicationRequestsRoute,
  PublicationRequestCreateRoute,
  PublicationRequestEditRoute,
  CorrespondenceCreateRoute,
  CorrespondenceViewRoute,
  CorrespondenceEditRoute,
  PartiesRoute,
  PartyCreateRoute,
  PartyEditRoute,
  JournalsRoute,
  JournalEditRoute,
  ChargeCreateRoute,
  ChargeEditRoute,
  ChargeViewRoute,
  LinkInvoiceRoute,
} from './routes';

const App = (props) => {
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const {
    actAs,
    match: { path },
  } = props;

  const addKey = useIntlKeyStore(state => state.addKey);
  addKey('ui-oa');

  if (actAs === 'settings') {
    return (
      <Suspense fallback={null}>
        <Settings {...props} />
      </Suspense>
    );
  }

  const keyboardShortcuts = importShortcuts([
    'new',
    'edit',
    'save',
    'expandAllSections',
    'collapseAllSections',
    'expandOrCollapseAccordion',
    'search',
    'openShortcutModal',
  ]);

  const changeShortcutsModal = () => {
    setShowShortcutModal(!showShortcutModal);
  };

  const shortcuts = [
    {
      name: 'openShortcutModal',
      handler: changeShortcutsModal,
    },
  ];

  return (
    <>
      <CommandList commands={keyboardShortcuts}>
        <HasCommand
          commands={shortcuts}
          isWithinScope={checkScope}
          scope={document.body}
        >
          <AppContextMenu>
            {(handleToggle) => (
              <NavList>
                <NavListSection>
                  <NavListItem
                    id="keyboard-shortcuts-item"
                    onClick={() => {
                      handleToggle();
                      setShowShortcutModal(true);
                    }}
                  >
                    <FormattedMessage id="ui-oa.appMenu.keyboardShortcuts" />
                  </NavListItem>
                </NavListSection>
              </NavList>
            )}
          </AppContextMenu>
          <Suspense fallback={null}>
            <Switch>
              <Route
                component={PublicationRequestCreateRoute}
                path={`${path}/publicationRequests/create`}
              />
              <Route
                component={PublicationRequestEditRoute}
                path={`${path}/publicationRequests/:id/edit`}
              />
              <Route
                component={CorrespondenceCreateRoute}
                path={`${path}/publicationRequests/:id/correspondence/create`}
              />
              <Route
                component={CorrespondenceEditRoute}
                path={`${path}/publicationRequests/:prId/correspondence/:cId/edit`}
              />
              <Route
                component={LinkInvoiceRoute}
                path={`${path}/publicationRequests/:prId/charge/:chId/linkInvoice`}
              />
              <Route
                component={ChargeCreateRoute}
                path={`${path}/publicationRequests/:id/charge/create`}
              />
              <Route
                component={ChargeEditRoute}
                path={`${path}/publicationRequests/:prId/charge/:chId/edit`}
              />
              <Route
                component={JournalEditRoute}
                path={`${path}/journals/:id/edit`}
              />
              <Route
                component={PartyCreateRoute}
                path={`${path}/people/create`}
              />
              <Route
                component={PartyEditRoute}
                path={`${path}/people/:id/edit`}
              />
              <PartiesRoute path={`${path}/people`} />
              <JournalsRoute path={`${path}/journals`} />
              <PublicationRequestsRoute path={`${path}/publicationRequests`}>
                <Route
                  component={ChargeViewRoute}
                  path={`${path}/publicationRequests/:prId/charge/:chId`}
                />
                <Route
                  component={CorrespondenceViewRoute}
                  path={`${path}/publicationRequests/:prId/correspondence/:cId`}
                />
              </PublicationRequestsRoute>
            </Switch>
          </Suspense>
        </HasCommand>
      </CommandList>
      {showShortcutModal && (
        <KeyboardShortcutsModal
          allCommands={keyboardShortcuts}
          onClose={changeShortcutsModal}
        />
      )}
    </>
  );
};

App.propTypes = {
  actAs: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  stripes: PropTypes.object.isRequired,
};

export default App;
