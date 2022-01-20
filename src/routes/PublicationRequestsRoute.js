import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  AppIcon,
  IfPermission
} from '@folio/stripes/core';

import {
  Button,
  ButtonGroup,
  FormattedUTCDate,
  PaneMenu,
} from '@folio/stripes/components';

import { SASQRoute } from '@k-int/stripes-kint-components';
import PublicationRequest from '../components/views/PublicationRequest';
import urls from '../util/urls';
import PublicationRequestsFilters from '../components/Filters/PublicationRequestsFilters';

const PublicationRequestsRoute = ({ path }) => {
  // TODO: Add coresponding author / request contact name to SASQ map search key

  const renderHeaderComponent = () => {
    return (
      <ButtonGroup fullWidth>
        <Button
          buttonStyle="primary"
          id="clickable-nav-oa-publication-requests"
        >
          <FormattedMessage id="ui-oa.searchAndFilter.requests" />
        </Button>
        <Button
          id="clickable-nav-oa-people"
          to={urls.people()}
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
    endpoint: 'oa/publicationRequest',
    SASQ_MAP: {
      searchKey: 'publicationTitle,requestNumber',
      filterKeys: {
        requestStatus: 'requestStatus.value',
      }
    }
  };

  const resultColumns = [
    {
      propertyPath:'requestNumber',
      label: <FormattedMessage id="ui-oa.publicationRequest.requestNumber" />
    },
    {
      propertyPath:'requestDate',
      label: <FormattedMessage id="ui-oa.publicationRequest.requestDate" />
    },
    {
      propertyPath:'requestStatus',
      label: <FormattedMessage id="ui-oa.publicationRequest.status" />
    },
    {
      propertyPath:'publicationTitle',
      label: <FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />
    },
    {
      propertyPath:'correspondingAuthorName',
      label: <FormattedMessage id="ui-oa.publicationRequest.correspondingAuthorName" />
    }
  ];

  const formatter = {
    requestNumber: d => (
      <AppIcon
        app="oa"
        iconAlignment="baseline"
        iconKey="app"
        size="small"
      >
        {d?.requestNumber}
      </AppIcon>
    ),
    requestStatus: d => (
      d?.requestStatus?.label
    ),
    requestDate: d => (
      d.requestDate ? <FormattedUTCDate value={d.requestDate} /> : ''
    )
  };

  const lastpaneMenu =
    <IfPermission perm="oa.publicationRequest.edit">
      <PaneMenu>
        <FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest">
          {ariaLabel => (
            <Button
              aria-label={ariaLabel}
              buttonStyle="primary"
              id="clickable-new-publication-request"
              marginBottom0
              to={`${urls.publicationRequestCreate()}`}
            >
              <FormattedMessage id="stripes-smart-components.new" />
            </Button>
          )}
        </FormattedMessage>
      </PaneMenu>
    </IfPermission>;

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      FilterComponent={PublicationRequestsFilters}
      FilterPaneHeaderComponent={renderHeaderComponent}
      id="publication-requests"
      mainPaneProps={{
        appIcon: <AppIcon app="oa" iconKey="app" size="small" />,
        lastMenu: lastpaneMenu,
        paneTitle: <FormattedMessage id="ui-oa.publicationRequests" />
      }}
      mclProps={{ formatter }}
      path={path}
      resultColumns={resultColumns}
      ViewComponent={PublicationRequest}
    />
  );
};

PublicationRequestsRoute.propTypes = {
  path: PropTypes.string.isRequired
};

export default PublicationRequestsRoute;
