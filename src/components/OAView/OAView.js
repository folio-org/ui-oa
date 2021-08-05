import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
  Button,
  TextField,
  MultiColumnList,
  SearchField,
} from '@folio/stripes/components';

import {
  SearchAndSortQuery,
  PersistedPaneset,
} from '@folio/stripes/smart-components';
import { FormattedMessage } from 'react-intl';
import urls from '../../util/urls';

import css from './OAView.css';
import { useHistory } from 'react-router-dom';

const propTypes = {
  children: PropTypes.object,
  scholarlyWorks: PropTypes.arrayOf(PropTypes.object),
  queryGetter: PropTypes.func.isRequired,
  querySetter: PropTypes.func.isRequired,
};

const OAView = ({
  children,
  data,
  queryGetter,
  querySetter,
  searchString
}) => {
  const history = useHistory()
  return (
    <SearchAndSortQuery
      querySetter={querySetter}
      queryGetter={queryGetter}
      initialSearchState={{ query: '' }}
    >
      {
        ({
          searchValue,
          getSearchHandlers,
          onSubmitSearch,
          activeFilters,
        }) => (<div>
          <PersistedPaneset
            appId="@folio/agreements"
            id="agreements-paneset"
          >
            <Pane
              defaultWidth="20%"
              paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
            >
              <form onSubmit={onSubmitSearch}>
                <SearchField
                  autoFocus
                  className={css.searchField}
                  id="input-agreement-search"
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
                  id="clickable-search-agreements"
                  type="submit"
                >
                  <FormattedMessage id="stripes-smart-components.search" />
                </Button>
              </form>
            </Pane>
            <Pane
              defaultWidth="fill"
            >
              <MultiColumnList
                autosize
                contentData={data.scholarlyWorks}
                visibleColumns={['authorNameList', 'publisherURL', 'localReference', 'journalIssueDate', 'journalVolume', 'journalIssue', 'journalPages']}
                onRowClick={(_e, rowData) => history.push(`${urls.scholarlyWorkView(rowData.id)}${searchString}`)}
              />
            </Pane>
            {children}
          </PersistedPaneset>
        </div>)
      }
    </SearchAndSortQuery>
  )
}

OAView.propTypes = propTypes;

export default OAView;