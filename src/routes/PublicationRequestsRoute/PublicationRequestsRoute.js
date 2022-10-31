import { useState } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { AppIcon, IfPermission } from '@folio/stripes/core';

import {
  Button,
  FormattedUTCDate,
  HasCommand,
  checkScope,
  Icon,
} from '@folio/stripes/components';

import { SASQRoute } from '@k-int/stripes-kint-components';
import { ReportingModal } from '../../components/Modals';
import PublicationRequest from '../../components/views/PublicationRequest';
import urls from '../../util/urls';
import focusSASQSearchField from '../../util/focusSASQSearchField';
import {
  PublicationRequestsFilters,
  OAFilterHeaderComponent,
} from '../../components/SearchAndFilter';
import { PUBLICATION_REQUESTS_ENDPOINT } from '../../constants/endpoints';

const PublicationRequestsRoute = ({ children, path }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const fetchParameters = {
    endpoint: PUBLICATION_REQUESTS_ENDPOINT,
    SASQ_MAP: {
      searchKey:
        'publicationTitle,requestNumber,correspondingAuthor.partyOwner.fullName,requestContact.partyOwner.fullName,externalRequestIds.externalId,doi,localReference,identifiers.publicationIdentifier',
      filterKeys: {
        requestStatus: 'requestStatus.value',
        chargeStatus: 'charges.chargeStatus.value',
        publicationType: 'publicationType.value',
        workOAStatus: 'workOAStatus.value',
        publisher: 'publisher.value',
        chargePayers: 'charges.payers.payer.value',
        correspondingInstitutionLevel1: 'correspondingInstitutionLevel1.value',
      },
    },
  };

  const handleCreate = () => {
    history.push(urls.publicationRequestCreate());
  };

  const shortcuts = [
    { name: 'new', handler: () => handleCreate() },
    {
      name: 'search',
      handler: () => focusSASQSearchField('publication-requests'),
    },
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

  const renderActionMenu = () => {
    return (
      <>
        <IfPermission perm="oa.publicationRequest.edit">
          <FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest">
            {(ariaLabel) => (
              <Button
                aria-label={ariaLabel}
                buttonStyle="dropdownItem"
                id="clickable-new-publication-request"
                marginBottom0
                onClick={() => handleCreate()}
              >
                <Icon icon="edit">
                  <FormattedMessage id="ui-oa.new" />
                </Icon>
              </Button>
            )}
          </FormattedMessage>
        </IfPermission>
        <FormattedMessage id="ui-oa.report.runOpenAPCChargesReport">
          {(ariaLabel) => (
            <Button
              aria-label={ariaLabel}
              buttonStyle="dropdownItem"
              id="clickable-run-openapc-charges-report"
              marginBottom0
              onClick={() => setShowModal(true)}
            >
              <Icon icon="report">
                <FormattedMessage id="ui-oa.report.runOpenAPCChargesReport" />
              </Icon>
            </Button>
          )}
        </FormattedMessage>
      </>
    );
  };

  return (
    <>
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <SASQRoute
          fetchParameters={fetchParameters}
          FilterComponent={PublicationRequestsFilters}
          FilterPaneHeaderComponent={renderHeaderComponent}
          filterPaneProps={{
            id: 'oa-main-filter-pane'
          }}
          id="publication-requests"
          mainPaneProps={{
            appIcon: <AppIcon app="oa" iconKey="app" size="small" />,
            actionMenu: renderActionMenu,
            paneTitle: <FormattedMessage id="ui-oa.publicationRequests" />,
            id: 'oa-main-pane'
          }}
          mclProps={{
            formatter,
            columnWidths: { publicationTitle: 500 },
          }}
          path={path}
          persistedPanesetProps={{
            id: 'oa-main-paneset'
          }}
          resultColumns={resultColumns}
          sasqProps={{ initialSortState: { sort: 'requestNumber' } }}
          searchFieldAriaLabel="publication-requests-search-field"
          ViewComponent={PublicationRequest}
        >
          {children}
        </SASQRoute>
      </HasCommand>
      <ReportingModal setShowModal={setShowModal} showModal={showModal} />
    </>
  );
};

PublicationRequestsRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  path: PropTypes.string.isRequired,
};

export default PublicationRequestsRoute;
