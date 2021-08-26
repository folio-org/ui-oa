const generateKiwtQuery = (options, nsValues) => {
  const { query, filters, sort } = nsValues;
  // console.log(nsValues)
  const {
    searchKey = '',
    /* Assumtion made that if no filterKey is provided then the given filterValues for that key are standalaone, ie require no comparator or key */
    filterKeys = {},
    sortKeys = {},
  } = options;

  const paramsArray = [];

  if (query) {
    paramsArray.push(searchKey.split(',')?.map(m => `match=${m}`));
    paramsArray.push(`term=${query}`);
  }

  if (filters) {
    const filterMap = {};
    filters.split(',').forEach(filter => {
      const [filterName, ...rest] = filter.split('.');
      const filterValue = rest.join('.');

      if (filterMap[filterName] === undefined) filterMap[filterName] = [];
      filterMap[filterName].push(filterValue);
    });

    // We now have a filterMap of shape { status: ['active', 'cancelled'], type: ['local'] }
    Object.entries(filterMap).forEach(([filterName, filterValues]) => {
      const filterKey = filterKeys[filterName];

      if (!filterKey) {
        // These filters have no key mapping so we just pass the values to the backend as-is.
        paramsArray.push(...filterValues?.map(f => `filters=${f}`));
      } else {
        const filterString = filterValues.map(v => `${filterKey}==${v}`).join('||');
        paramsArray.push(`filters=${filterString}`);
      }
    });
  }

  if (sort) {
    paramsArray.push(...sort.split(',').map(sortKey => {
      const descending = sortKey.startsWith('-');
      let term = sortKey.replace('-', '');

      if (term in sortKeys) {
        term = term.replace(term, sortKeys[term]);
      }

      return `sort=${term};${descending ? 'desc' : 'asc'}`;
    }));
  }

  paramsArray.push('stats=true')

  return '?'+paramsArray.map(p => encodeURI(p)).join('&');
};

export default generateKiwtQuery;
