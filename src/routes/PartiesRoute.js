import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  AppIcon,
} from '@folio/stripes/core';

import {
  Button,
  ButtonGroup,
} from '@folio/stripes/components';

import { SASQRoute } from '@k-int/stripes-kint-components';
import Party from '../components/views/Party';
import urls from '../util/urls';

const PartiesRoute = ({ path }) => {
  const renderHeaderComponent = () => {
    return (
      <ButtonGroup fullWidth>
        <Button
          id="clickable-nav-oa-publication-requests"
          to={urls.publicationRequests()}
        >
          <FormattedMessage id="ui-oa.searchAndFilter.requests" />
        </Button>
        <Button
          buttonStyle="primary"
          id="clickable-nav-oa-people"
        >
          <FormattedMessage id="ui-oa.searchAndFilter.people" />
        </Button>
        <Button
          id="clickable-nav-oa-journals"
          // to={urls.journals()}
        >
          <FormattedMessage id="ui-oa.searchAndFilter.journals" />
        </Button>
      </ButtonGroup>
    );
  };
  const fetchParameters = {
    endpoint: 'oa/party',
    SASQ_MAP: {
      searchKey: 'mainEmail, givenNames, familyName',
      filterKeys: {
      }
    }
  };

  const resultColumns = [
    {
      propertyPath:'givenNames',
      label: <FormattedMessage id="ui-oa.parties.givenNames" />
    },
    {
      propertyPath:'familyName',
      label: <FormattedMessage id="ui-oa.parties.familyName" />
    },
    {
      propertyPath:'mainEmail',
      label: <FormattedMessage id="ui-oa.parties.mainEmail" />
    },
  ];

  const formatter = {
    givenNames: d => (
      <AppIcon
        app="users"
        iconAlignment="baseline"
        iconKey="app"
        size="small"
      >
        {d?.givenNames}
      </AppIcon>
    ),
  };

  const initialSortState = {
    sort: 'givenNames'
  };

//   TODO: Can be used when peopleCreate view is implemented
//
//   const lastpaneMenu =
//     <IfPermission perm="oa.party.edit">
//       <PaneMenu>
//         <FormattedMessage id="ui-oa.publicationRequest.createPersonRecord">
//           {ariaLabel => (
//             <Button
//               aria-label={ariaLabel}
//               buttonStyle="primary"
//               id="clickable-new-person"
//               marginBottom0
//               to={`${urls.partyCreate()}`}
//             >
//               <FormattedMessage id="stripes-smart-components.new" />
//             </Button>
//           )}
//         </FormattedMessage>
//       </PaneMenu>
//     </IfPermission>;

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      FilterPaneHeaderComponent={renderHeaderComponent}
      id="publication-requests"
      mainPaneProps={{
        appIcon: <AppIcon app="users" iconKey="app" size="small" />,
        // lastMenu: lastpaneMenu,
        paneTitle: <FormattedMessage id="ui-oa.parties.people" />,
      }}
      mclProps={{ formatter }}
      path={path}
      resultColumns={resultColumns}
      sasqProps={{ initialSortState }}
      ViewComponent={Party}
    />
  );
};

PartiesRoute.propTypes = {
  path: PropTypes.string.isRequired
};

export default PartiesRoute;
