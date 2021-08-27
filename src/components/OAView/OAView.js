import React from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
  PaneMenu,
  Button,
  MultiColumnList,
  SearchField,
} from '@folio/stripes/components';

import {
  SearchAndSortQuery,
  PersistedPaneset,
} from '@folio/stripes/smart-components';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { IfPermission } from '@folio/stripes/core';

import urls from '../../util/urls';

import css from './OAView.css';

import OAFilters from '../OAFilters/OAFilters';

const propTypes = {
  children: PropTypes.object,
  publicationRequests: PropTypes.arrayOf(PropTypes.object),
  queryGetter: PropTypes.func.isRequired,
  querySetter: PropTypes.func.isRequired,
  data: PropTypes.object,
  searchString: PropTypes.string
};

const OAView = ({
  children,
  data,
  queryGetter,
  querySetter,
  searchString,
}) => {
  const history = useHistory();

  const formatter = {
    requestStatus: e => {
      return e?.requestStatus?.label;
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
                defaultWidth="fill"
                lastMenu={(
                    <IfPermission perm="oa.scholarlyWork.edit">
                      <PaneMenu>
                        <FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest">
                          {ariaLabel => (
                            <Button
                              aria-label={ariaLabel}
                              buttonStyle="primary"
                              id="clickable-new-scholarly-work"
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
              >
                <MultiColumnList
                  autosize
                  contentData={data.publicationRequests}
                  formatter={formatter}
                  onHeaderClick={onSort}
                  onRowClick={(_e, rowData) => history.push(`${urls.publicationRequest(rowData.id)}${searchString}`)}
                  visibleColumns={['requestDate', 'requestStatus']}
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

OAView.propTypes = propTypes;

export default OAView;
