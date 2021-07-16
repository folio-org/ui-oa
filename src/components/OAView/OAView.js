import React from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
  Paneset,
  TextField,
} from '@folio/stripes/components';

import {
  SearchAndSortQuery,
} from '@folio/stripes/smart-components';
import { FormattedMessage } from 'react-intl';
import css from './OAView.css';

const propTypes = {
  scholarlyWorks: PropTypes.arrayOf(PropTypes.object),
  queryGetter: PropTypes.func.isRequired,
  querySetter: PropTypes.func.isRequired,
};

const OAView = ({
  data,
  queryGetter,
  querySetter
}) => {
  const arr = data.scholarlyWorks
  console.log(arr)

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
        }) => (<div>
          <Paneset>
            <Pane
              defaultWidth="20%"
              paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
            >
              <TextField
                label="Filter"
                name="query"
                onChange={getSearchHandlers().query}
                value={searchValue.query}
              />
            </Pane>
            <Pane
              defaultWidth="fill"
            >
              <p> This is where the OA application will go </p>
            </Pane>
          </Paneset>
        </div>)
      }
    </SearchAndSortQuery>
  )
}

OAView.propTypes = propTypes;

export default OAView;