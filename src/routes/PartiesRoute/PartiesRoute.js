import PropTypes from 'prop-types';

import kyImport from 'ky';

import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

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

import {
  MAIN_FILTER_PANE_CONFIG,
  MAIN_PANE_ID,
  MAIN_PANESET_CONFIG,
} from '../../constants/panesetConfigs';

const PartiesRoute = ({ path }) => {
  const history = useHistory();
  const location = useLocation();
  const renderHeaderComponent = () => {
    return <OAFilterHeaderComponent primary="people" />;
  };

  const fetchParameters = {
    endpoint: 'https://gokb.org/gokb/rest/titles',
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
    history.push(`${urls.partyCreate()}${location.search}`);
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
    <IfPermission perm="ui-oa.party.edit">
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

  const generateQuery = (params, _query) => {
    const offset = (params.page - 1) * params.perPage;

    return `?max=${params.perPage}&offset=${offset}&es=true`;
  };

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
        filterPaneProps={MAIN_FILTER_PANE_CONFIG}
        id="parties"
        labelOverrides={{
          foundValues: 'ui-oa.parties.found#People',
        }}
        lookupQueryPromise={({ _ky, queryParams, endpoint }) =>
          kyImport.get(`${endpoint}${queryParams}`).json()}
        mainPaneProps={{
          appIcon: <AppIcon app="oa" iconKey="party" size="small" />,
          lastMenu: lastpaneMenu,
          paneTitle: <FormattedMessage id="ui-oa.parties.people" />,
          id: MAIN_PANE_ID,
        }}
        mclProps={{ formatter }}
        path={path}
        persistedPanesetProps={MAIN_PANESET_CONFIG}
        queryParameterGenerator={generateQuery}
        responseTransform={(data) => {
          const transformedData = {
            ...data,
            totalRecords: data._pagination.total,
            results: data?.data,
          };
          return transformedData;
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
