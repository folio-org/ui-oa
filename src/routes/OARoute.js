import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect, useOkapiKy } from '@folio/stripes/core';
import {
  buildFilterString,
  locationQuerySetter,
  locationQueryGetter,
  filterStringToObject
} from '../util/filterUtils';
import {
  useQuery,
} from 'react-query'

import OAView from '../components/OAView';

const propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  resources: PropTypes.object,
};

const OARoute = ({ mutator, resources, location, history }) => {


  const handleFilterChange = (incomingFilters) => {
    const filterString = buildFilterString(incomingFilters);
    locationQuerySetter({ location, history, nsValues: { filters: filterString } });
  };

  const handleSearchTermChange = (incomingSearchTerm) => {
    locationQuerySetter({ location, history, nsValues: { query: incomingSearchTerm } });
  };

  const parseFilters = () => {
    const query = locationQueryGetter({ location });
    const parsedFilters = filterStringToObject(query.filters);
    return parsedFilters;
  };

  const parsedQuery = locationQueryGetter({ location })?.query;

  const [query, setQuery] = useState()

  const querySetter = ({ nsValues }) => setQuery(nsValues)

  const ky = useOkapiKy();
  const { data: scholarlyWorks } = useQuery(
    ['ui-oa', 'oaRoute', 'scholarlyWork', query], () => ky('oa/scholarlyWork').json()
  )

  const queryGetter = () => (query)

  return (
    <OAView
      data={{
        scholarlyWorks: scholarlyWorks
      }}
      queryGetter={queryGetter}
      querySetter={querySetter}
    >
    </OAView>
  );
};

OARoute.propTypes = propTypes;

export default stripesConnect(OARoute);
