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
import { OAFilterHeaderComponent } from '../../components/SearchAndFilter';
import Party from '../../components/views/Party';
import urls from '../../util/urls';
import focusSASQSearchField from '../../util/focusSASQSearchField';

const PartiesRoute = ({ path }) => {
  const history = useHistory();
  const renderHeaderComponent = () => {
    return <OAFilterHeaderComponent primary="people" />;
  };

  const fetchParameters = {
    endpoint: 'oa/party',
    SASQ_MAP: {
      searchKey: 'mainEmail,givenNames,familyName,orcidId',
      filterKeys: {},
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
      <AppIcon iconAlignment="baseline" iconKey="app" size="small">
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
        FilterPaneHeaderComponent={renderHeaderComponent}
        id="parties"
        mainPaneProps={{
          appIcon: <AppIcon iconKey="app" size="small" />,
          lastMenu: lastpaneMenu,
          paneTitle: <FormattedMessage id="ui-oa.parties.people" />,
        }}
        mclProps={{ formatter }}
        path={path}
        resultColumns={resultColumns}
        sasqProps={{ initialSortState: { sort: 'familyName,givenNames' } }}
        ViewComponent={Party}
      />
    </HasCommand>
  );
};

PartiesRoute.propTypes = {
  path: PropTypes.string.isRequired,
};

export default PartiesRoute;
