import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// import queryString from 'query-string';
import buildUrl from './buildUrl';

// Commented out for lint no-unused-var
// const locationQueryGetter = ({ location }) => {
//   return queryString.parse(location.search || '');
// }

const locationQuerySetter = ({ location, history, nsValues }) => {
  const url = buildUrl(location, nsValues);
  history.push(url);
};

const useKiwtSASQuery = () => {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState({});
  const queryGetter = () => query;
  const querySetter = ({ nsValues }) => {
    setQuery(nsValues);
    locationQuerySetter({ location, history, nsValues });
  };
  return { query, queryGetter, querySetter };
};

export default useKiwtSASQuery;
