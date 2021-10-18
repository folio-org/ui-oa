import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  ButtonGroup,
  MultiColumnList,
  Pane,
  PaneMenu,
  SearchField,
} from '@folio/stripes/components';

import {
  SearchAndSortQuery,
  PersistedPaneset,
} from '@folio/stripes/smart-components';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import {
  AppIcon,
  IfPermission
} from '@folio/stripes/core';

import urls from '../../util/urls';

import css from './PublicationRequests.css';

import OAFilters from '../../components/OAFilters';

const propTypes = {
  children: PropTypes.object,
  publicationRequests: PropTypes.arrayOf(PropTypes.object),
  queryGetter: PropTypes.func.isRequired,
  querySetter: PropTypes.func.isRequired,
  data: PropTypes.object,
  searchString: PropTypes.string
};

const PublicationRequests = ({
  children,
  data,
  queryGetter,
  querySetter,
  searchString,
}) => {
  const history = useHistory();

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

  return (
    <SearchAndSortQuery
      initialSearchState={{ query: '' }}
      queryGetter={queryGetter}
      querySetter={querySetter}
    >
      {
        ({
          searchValue,
          getSearchHandlers,
          onSubmitSearch,
          activeFilters,
          getFilterHandlers,
          onSort
        }) => (
          <div>
            <PersistedPaneset
              appId="@folio/oa"
              id="oa-paneset"
            >
              <Pane
                defaultWidth="20%"
                paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
              >
                <form onSubmit={onSubmitSearch}>
                  <ButtonGroup fullWidth>
                    <Button
                      buttonStyle="primary"
                      id="clickable-nav-oa-publication-requests"
                    >
                      <FormattedMessage id="ui-oa.publicationRequests.requests" />
                    </Button>
                    <Button
                      id="clickable-nav-oa-something-else"
                      to={urls.publicationRequests()}
                    >
                      <FormattedMessage id="ui-oa.publicationRequests.requests" />
                    </Button>
                  </ButtonGroup>
                  <SearchField
                    autoFocus
                    className={css.searchField}
                    marginBottom0
                    name="query"
                    onChange={getSearchHandlers().query}
                    onClear={getSearchHandlers().reset}
                    value={searchValue.query}
                  />
                  <Button
                    buttonStyle="primary"
                    disabled={!searchValue.query || searchValue.query === ''}
                    fullWidth
                    type="submit"
                  >
                    <FormattedMessage id="stripes-smart-components.search" />
                  </Button>
                  <OAFilters
                    activeFilters={activeFilters.state}
                    filterHandlers={getFilterHandlers()}
                  />
                </form>
              </Pane>
              <Pane
                appIcon={<AppIcon app="oa" iconKey="app" size="small" />}
                defaultWidth="fill"
                lastMenu={(
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
                  </IfPermission>
                )}
                paneSub={data?.publicationRequests !== undefined ?
                  <FormattedMessage id="ui-oa.publicationRequests.recordsFound" values={{ number: data?.publicationRequests?.length }} /> : ''}
                paneTitle={<FormattedMessage id="ui-oa.publicationRequests" />}
              >
                {/* TODO: CorrespondingAuthorName needs correct mapping in formatter */}
                <MultiColumnList
                  autosize
                  columnMapping={{
                    requestNumber: <FormattedMessage id="ui-oa.publicationRequest.requestNumber" />,
                    requestDate: <FormattedMessage id="ui-oa.publicationRequest.requestDate" />,
                    requestStatus: <FormattedMessage id="ui-oa.publicationRequest.status" />,
                    publicationTitle: <FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />,
                    correspondingAuthorName: <FormattedMessage id="ui-oa.publicationRequest.correspondingAuthorName" />,
                  }}
                  contentData={data.publicationRequests}
                  formatter={formatter}
                  onHeaderClick={onSort}
                  onRowClick={(_e, rowData) => history.push(`${urls.publicationRequest(rowData.id)}${searchString}`)}
                  visibleColumns={['requestNumber', 'requestDate', 'requestStatus', 'publicationTitle', 'correspondingAuthorName']}
                />
              </Pane>
              {children}
            </PersistedPaneset>
          </div>
        )
      }
    </SearchAndSortQuery>
  );
};

PublicationRequests.propTypes = propTypes;

export default PublicationRequests;
