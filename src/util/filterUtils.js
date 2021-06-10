// Functions mostly copied directly from https://github.com/folio-org/stripes-smart-components/blob/master/lib/SearchAndSort/SearchAndSortQuery.js

import queryString from 'query-string';
import buildUrl from './buildUrl';

export function buildFilterString(activeFilters) {
  const newFiltersString = Object.keys(activeFilters)
    .filter((filterName) => Array.isArray(activeFilters[filterName]) && activeFilters[filterName].length)
    .map((filterName) => {
      return activeFilters[filterName].map((filterValue) => {
        return `${filterName}.${filterValue}`;
      }).join(',');
    }).join(',');

  return newFiltersString;
}

export function locationQuerySetter({ location, history, nsValues }) {
  const url = buildUrl(location, nsValues);
  history.push(url);
}

export function locationQueryGetter({ location }) {
  return queryString.parse(location.search || '');
}

export function filterStringToObject(str) {
  if (!str) return {};
  const filterObject = {};
  const filterArray = str.split(',');
  filterArray.forEach(f => {
    const [filterName, ...rest] = f.split('.');
    const filterValue = rest.join('.'); // support both filterName.value and filterName.value.with.dot

    if (filterObject[filterName]) {
      filterObject[filterName].push(filterValue);
    } else {
      filterObject[filterName] = [filterValue];
    }
  });
  return filterObject;
}
