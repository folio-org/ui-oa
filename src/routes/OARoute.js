import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import {
  buildFilterString,
  locationQuerySetter,
  locationQueryGetter,
  filterStringToObject
} from '../util/filterUtils';

import OAView from '../components/OAView';

const propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};

const OARoute = ({ location, history }) => {

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

  return (
    <OAView />
  );
};

OARoute.propTypes = propTypes;

export default stripesConnect(OARoute);
