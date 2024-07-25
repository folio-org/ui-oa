import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

import { AppIcon, IfPermission } from '@folio/stripes/core';
import {
  Button,
  checkScope,
  HasCommand,
  PaneMenu,
} from '@folio/stripes/components';
import { SASQRoute } from '@k-int/stripes-kint-components';

import { OAFilterHeaderComponent, JournalsFilters } from '../../components/SearchAndFilter';
import { findIssnByNamespace } from '../../util/journalUtils';
import Journal from '../../components/views/Journal';
import { JournalModal } from '../../components/Modals';
import urls from '../../util/urls';
import focusSASQSearchField from '../../util/focusSASQSearchField';
import { WORKS_ENDPOINT } from '../../constants/endpoints';

import {
  MAIN_FILTER_PANE_CONFIG,
  MAIN_PANE_ID,
  MAIN_PANESET_CONFIG
} from '../../constants/panesetConfigs';

const JournalsRoute = ({ path }) => {
  const history = useHistory();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const handleJournalChange = (journal) => {
    history.push(`${urls.journal(journal.id)}${location.search}`);
  };

  const renderISSN = (d, namespace) => {
    const issn = findIssnByNamespace(d, namespace);
    return issn?.value;
  };

  const renderHeaderComponent = () => {
    return <OAFilterHeaderComponent primary="journals" />;
  };

  const fetchParameters = {
    endpoint: WORKS_ENDPOINT,
    SASQ_MAP: {
      searchKey: 'instances.identifiers.identifier.value,title',
      filterKeys: {
        oaStatus: 'oaStatus.value',
        indexedInDOAJ: 'indexedInDOAJ.value',
      },
    },
  };

  const shortcuts = [
    { name: 'new', handler: () => setShowModal(true) },
    { name: 'search', handler: () => focusSASQSearchField('journals') },
  ];

  const resultColumns = [
    {
      propertyPath: 'title',
      label: <FormattedMessage id="ui-oa.journals.title" />,
    },
    {
      propertyPath: 'printIssn',
      label: <FormattedMessage id="ui-oa.journals.printIssn" />,
    },
    {
      propertyPath: 'electronicIssn',
      label: <FormattedMessage id="ui-oa.journals.electronicIssn" />,
    },
  ];

  const formatter = {
    title: (d) => (
      <AppIcon app="oa" iconAlignment="baseline" iconKey="journal" size="small">
        {d?.title}
      </AppIcon>
    ),
    printIssn: (d) => renderISSN(d, 'print'),
    electronicIssn: (d) => renderISSN(d, 'electronic'),
  };

  const lastpaneMenu = (
    <IfPermission perm="oa.works.create">
      <PaneMenu>
        <FormattedMessage id="ui-oa.journal.new">
          {(ariaLabel) => (
            <Button
              aria-label={ariaLabel}
              buttonStyle="primary"
              id="new-journal"
              marginBottom0
              onClick={() => setShowModal(true)}
            >
              <FormattedMessage id="stripes-smart-components.new" />
            </Button>
          )}
        </FormattedMessage>
      </PaneMenu>
    </IfPermission>
  );

  return (
    <>
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <SASQRoute
          fetchParameters={fetchParameters}
          FilterComponent={JournalsFilters}
          FilterPaneHeaderComponent={renderHeaderComponent}
          filterPaneProps={MAIN_FILTER_PANE_CONFIG}
          id="journals"
          labelOverrides={{
            foundValues: 'ui-oa.journals.found#Journals',
          }}
          mainPaneProps={{
            appIcon: <AppIcon app="oa" iconKey="journal" size="small" />,
            lastMenu: lastpaneMenu,
            paneTitle: <FormattedMessage id="ui-oa.journals" />,
            id: MAIN_PANE_ID,
          }}
          mclProps={{ formatter }}
          path={path}
          persistedPanesetProps={MAIN_PANESET_CONFIG}
          resultColumns={resultColumns}
          sasqProps={{ initialSortState: { sort: 'title' } }}
          searchFieldAriaLabel="journals-search-field"
          ViewComponent={Journal}
        />
      </HasCommand>
      <JournalModal
        handleJournalChange={handleJournalChange}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

JournalsRoute.propTypes = {
  path: PropTypes.string.isRequired,
};

export default JournalsRoute;
