import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { AppIcon, IfPermission } from '@folio/stripes/core';

import {
  Button,
  FormattedUTCDate,
  HasCommand,
  PaneMenu,
  checkScope,
} from '@folio/stripes/components';

import { SASQRoute } from '@k-int/stripes-kint-components';
import PublicationRequest from '../../components/views/PublicationRequest';
import urls from '../../util/urls';
import focusSASQSearchField from '../../util/focusSASQSearchField';
import {
  PublicationRequestsFilters,
  OAFilterHeaderComponent,
} from '../../components/SearchAndFilter';

const PublicationRequestsRoute = ({ children, path }) => {
  const history = useHistory();

  const fetchParameters = {
    endpoint: 'oa/publicationRequest',
    SASQ_MAP: {
      searchKey:
        'publicationTitle,requestNumber,correspondingAuthor.partyOwner.fullName,requestContact.partyOwner.fullName,externalRequestIds.externalId',
      filterKeys: {
        requestStatus: 'requestStatus.value',
      },
    },
  };

  const handleCreate = () => {
    history.push(urls.publicationRequestCreate());
  };

  const shortcuts = [
    { name: 'new', handler: () => handleCreate() },
    { name: 'search', handler: () => focusSASQSearchField('publication-requests') },
  ];

  const renderHeaderComponent = () => {
    return <OAFilterHeaderComponent primary="publicationRequests" />;
  };

  const resultColumns = [
    {
      propertyPath: 'requestNumber',
      label: <FormattedMessage id="ui-oa.publicationRequest.requestNumber" />,
    },
    {
      propertyPath: 'requestDate',
      label: <FormattedMessage id="ui-oa.publicationRequest.requestDate" />,
    },
    {
      propertyPath: 'requestStatus',
      label: <FormattedMessage id="ui-oa.publicationRequest.status" />,
    },
    {
      propertyPath: 'publicationTitle',
      label: (
        <FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />
      ),
    },
    {
      propertyPath: 'correspondingAuthor',
      label: (
        <FormattedMessage id="ui-oa.publicationRequest.correspondingAuthorName" />
      ),
    },
  ];

  const formatter = {
    requestNumber: (d) => (
      <AppIcon app="oa" iconAlignment="baseline" iconKey="app" size="small">
        {d?.requestNumber}
      </AppIcon>
    ),
    requestStatus: (d) => d?.requestStatus?.label,
    requestDate: (d) => (d.requestDate ? <FormattedUTCDate value={d.requestDate} /> : ''),
    correspondingAuthor: (d) => d.correspondingAuthor?.partyOwner?.fullName,
  };

  const lastpaneMenu = (
    <IfPermission perm="oa.publicationRequest.edit">
      <PaneMenu>
        <FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest">
          {(ariaLabel) => (
            <Button
              aria-label={ariaLabel}
              buttonStyle="primary"
              id="clickable-new-publication-request"
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
        FilterComponent={PublicationRequestsFilters}
        FilterPaneHeaderComponent={renderHeaderComponent}
        id="publication-requests"
        mainPaneProps={{
          appIcon: <AppIcon app="oa" iconKey="app" size="small" />,
          lastMenu: lastpaneMenu,
          paneTitle: <FormattedMessage id="ui-oa.publicationRequests" />,
        }}
        mclProps={{
          formatter,
          columnWidths: { publicationTitle: 500 },
        }}
        path={path}
        resultColumns={resultColumns}
        sasqProps={{ initialSortState: { sort: 'requestNumber' } }}
        ViewComponent={PublicationRequest}
      >
        {children}
      </SASQRoute>
    </HasCommand>
  );
};

PublicationRequestsRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  path: PropTypes.string.isRequired,
};

export default PublicationRequestsRoute;
