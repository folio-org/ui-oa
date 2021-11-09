import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  AppIcon,
  IfPermission
} from '@folio/stripes/core';

import {
  Button,
  PaneMenu,
} from '@folio/stripes/components';

import SASQRoute from '@k-int/stripes-kint-components/src/lib/SASQRoute/SASQRoute';
import View from '../views/PublicationRequest';
import urls from '../util/urls';
import OAFilters from '../components/OAFilters';

const PublicationRequestsSASQRoute = ({ path }) => {
  // TODO: Add coresponding author / request contact name to SASQ map search key
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
    requestNumber: d => {
      return (
        <AppIcon
          app="oa"
          iconAlignment="baseline"
          iconKey="app"
          size="small"
        >
          {d?.requestNumber}
        </AppIcon>
      );
    },
    requestStatus: d => {
      return d?.requestStatus?.label;
    },
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
      FilterComponent={OAFilters}
      id="publication-requests"
      mainPaneProps={{
        appIcon: <AppIcon app="oa" iconKey="app" size="small" />,
        lastMenu: lastpaneMenu,
        paneTitle: <FormattedMessage id="ui-oa.publicationRequests" />
      }}
      mclProps={{ formatter }}
      resultColumns={resultColumns}
      path={path}
      ViewComponent={View}
    />
  );
};

export default PublicationRequestsSASQRoute;
