import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { AppIcon, IfPermission } from '@folio/stripes/core';
import {
  Button,
  checkScope,
  HasCommand,
  PaneMenu,
} from '@folio/stripes/components';
import { SASQRoute } from '@k-int/stripes-kint-components';

import { OAFilterHeaderComponent } from '../../components/SearchAndFilter';
import { findIssnByNamespace } from '../../util/journalUtils';
import Journal from '../../components/views/Journal';
import { JournalModal } from '../../components/Modals';
import urls from '../../util/urls';
import focusSASQSearchField from '../../util/focusSASQSearchField';

const JournalsRoute = ({ path }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const handleJournalChange = (journal) => {
    history.push(urls.journal(journal.id));
  };

  const renderISSN = (d, namespace) => {
    const issn = findIssnByNamespace(d, namespace);
    return issn?.value;
  };

  const renderHeaderComponent = () => {
    return <OAFilterHeaderComponent primary="journals" />;
  };

  const fetchParameters = {
    endpoint: 'oa/works',
    SASQ_MAP: {
      searchKey: 'instances.identifiers.identifier.value,title',
      filterKeys: {},
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
      <AppIcon iconAlignment="baseline" iconKey="app" size="small">
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
          FilterPaneHeaderComponent={renderHeaderComponent}
          id="journals"
          mainPaneProps={{
            appIcon: <AppIcon iconKey="app" size="small" />,
            lastMenu: lastpaneMenu,
            paneTitle: <FormattedMessage id="ui-oa.journals" />,
          }}
          mclProps={{ formatter }}
          path={path}
          resultColumns={resultColumns}
          sasqProps={{ initialSortState: { sort: 'title' } }}
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
