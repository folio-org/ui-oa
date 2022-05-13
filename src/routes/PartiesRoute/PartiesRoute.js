import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { AppIcon, IfPermission } from '@folio/stripes/core';
import { Button, PaneMenu } from '@folio/stripes/components';

import { SASQRoute } from '@k-int/stripes-kint-components';
import { OAFilterHeaderComponent } from '../../components/SearchAndFilter';
import Party from '../../components/views/Party';
import urls from '../../util/urls';

const PartiesRoute = ({ path }) => {
  const renderHeaderComponent = () => {
    return <OAFilterHeaderComponent primary="people" />;
  };

  const fetchParameters = {
    endpoint: 'oa/party',
    SASQ_MAP: {
      searchKey: 'mainEmail,givenNames,familyName,orcidId',
      filterKeys: {},
      sort: [{ path: 'familyName' }, { path: 'givenNames' }],
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
              to={`${urls.partyCreate()}`}
            >
              <FormattedMessage id="stripes-smart-components.new" />
            </Button>
          )}
        </FormattedMessage>
      </PaneMenu>
    </IfPermission>
  );

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      FilterPaneHeaderComponent={renderHeaderComponent}
      id="parties-sasq"
      mainPaneProps={{
        appIcon: <AppIcon iconKey="app" size="small" />,
        lastMenu: lastpaneMenu,
        paneTitle: <FormattedMessage id="ui-oa.parties.people" />,
      }}
      mclProps={{ formatter }}
      path={path}
      resultColumns={resultColumns}
      ViewComponent={Party}
    />
  );
};

PartiesRoute.propTypes = {
  path: PropTypes.string.isRequired,
};

export default PartiesRoute;
