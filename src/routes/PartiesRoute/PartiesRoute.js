import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { AppIcon, IfPermission } from '@folio/stripes/core';
import {
  Button,
  PaneMenu,
  HasCommand,
  checkScope,
} from '@folio/stripes/components';

import { SASQRoute } from '@k-int/stripes-kint-components';
import {
  OAFilterHeaderComponent,
  PartiesFilters,
} from '../../components/SearchAndFilter';
import Party from '../../components/views/Party';
import urls from '../../util/urls';
import focusSASQSearchField from '../../util/focusSASQSearchField';
import { PARTIES_ENDPOINT } from '../../constants/endpoints';

const PartiesRoute = ({ path }) => {
  const history = useHistory();
  const renderHeaderComponent = () => {
    return <OAFilterHeaderComponent primary="people" />;
  };

  const fetchParameters = {
    endpoint: PARTIES_ENDPOINT,
    SASQ_MAP: {
      searchKey: 'mainEmail,givenNames,familyName,orcidId',
      filterKeys: { institutionLevel1: 'institutionLevel1.value' },
    },
  };

  const resultColumns = [
    {
      propertyPath: 'givenNames',
      label: <FormattedMessage id="ui-oa.parties.givenNames" />,
    },
    {
      propertyPath: 'familyName',
      label: <FormattedMessage id="ui-oa.parties.familyName" />,
    },
    {
      propertyPath: 'orcidId',
      label: <FormattedMessage id="ui-oa.parties.orcidId" />,
    },
    {
      propertyPath: 'mainEmail',
      label: <FormattedMessage id="ui-oa.parties.mainEmail" />,
    },
  ];

  const handleCreate = () => {
    history.push(urls.partyCreate());
  };

  const shortcuts = [
    { name: 'new', handler: () => handleCreate() },
    { name: 'search', handler: () => focusSASQSearchField('parties') },
  ];

  const formatter = {
    givenNames: (d) => (
      <AppIcon app="oa" iconAlignment="baseline" iconKey="party" size="small">
        {d?.givenNames}
      </AppIcon>
    ),
  };

  const lastpaneMenu = (
    <IfPermission perm="oa.party.edit">
      <PaneMenu>
        <FormattedMessage id="ui-oa.party.new">
          {(ariaLabel) => (
            <Button
              aria-label={ariaLabel}
              buttonStyle="primary"
              id="new-party"
              marginBottom0
              onClick={() => handleCreate()}
            >
              <FormattedMessage id="stripes-smart-components.new" />
            </Button>
          )}
        </FormattedMessage>
      </PaneMenu>
    </IfPermission>
  );

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <SASQRoute
        fetchParameters={fetchParameters}
        FilterComponent={PartiesFilters}
        FilterPaneHeaderComponent={renderHeaderComponent}
        filterPaneProps={{
          id: 'oa-main-filter-pane'
        }}
        id="parties"
        labelOverrides={{
          foundValues: 'ui-oa.parties.found#People',
        }}
        mainPaneProps={{
          appIcon: <AppIcon app="oa" iconKey="party" size="small" />,
          lastMenu: lastpaneMenu,
          paneTitle: <FormattedMessage id="ui-oa.parties.people" />,
          id: 'oa-main-pane'
        }}
        mclProps={{ formatter }}
        path={path}
        persistedPanesetProps={{
          id: 'oa-main-paneset'
        }}
        resultColumns={resultColumns}
        sasqProps={{ initialSortState: { sort: 'familyName,givenNames' } }}
        searchFieldAriaLabel="parties-search-field"
        ViewComponent={Party}
      />
    </HasCommand>
  );
};

PartiesRoute.propTypes = {
  path: PropTypes.string.isRequired,
};

export default PartiesRoute;
