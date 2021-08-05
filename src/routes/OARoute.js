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
import { generateQueryParams } from '@folio/stripes-erm-components';
import queryString from 'query-string';
import OAView from '../components/OAView';

const propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  history: PropTypes.object,
  resources: PropTypes.object,
};

const OARoute = ({ children, history, location, match }) => {

  // const handleFilterChange = (incomingFilters) => {
  //   const filterString = buildFilterString(incomingFilters);
  //   locationQuerySetter({ location, history, nsValues: { filters: filterString } });
  // };

  // const parseFilters = () => {
  //   const query = locationQueryGetter({ location });
  //   const parsedFilters = filterStringToObject(query.filters);
  //   return parsedFilters;
  // };

  const [query, setQuery] = useState({})

  const ky = useOkapiKy();
  const { data: scholarlyWorks } = useQuery(
    ['ui-oa', 'oaRoute', 'scholarlyWork', query], () => ky('oa/scholarlyWork').json()
  )

  // const parsedQuery = locationQueryGetter({ location, history, nsValues }) // ?.query;

  const queryGetter = () => (query)

  const querySetter = ({ nsValues }) => {
    setQuery(nsValues)
    handleSearchTermChange(nsValues.query)
  }

  const handleSearchTermChange = (incomingSearchTerm) => {
    locationQuerySetter({ location, history, nsValues: { query: incomingSearchTerm } });
  };


  // const parsedQuery = queryString.parse(location?.search)
  // const params = generateQueryParams({})(parsedQuery, match?.params, {query}, null, null)
  // TODO: Remove this and clean up
  // console.log(params)
  return (
    <OAView
      data={{
        scholarlyWorks: scholarlyWorks
      }}
      queryGetter={queryGetter}
      querySetter={querySetter}
      searchString={location.search}
    >
      {children}
    </OAView>
  );
};

OARoute.propTypes = propTypes;

export default stripesConnect(OARoute);
