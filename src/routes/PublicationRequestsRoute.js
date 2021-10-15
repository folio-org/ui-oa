import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import generateKiwtQuery from '../util/generateKiwtQuery';
import PublicationRequests from '../views/PublicationRequests/PublicationRequests';
import useKiwtSASQuery from '../util/useKiwtSASQuery';

const propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
};

const PublicationRequestsRoute = ({ children, location }) => {
  const { query, queryGetter, querySetter } = useKiwtSASQuery();

  const SASQ_MAP = {
    searchKey: 'requestStatus.value',
    filterKeys: {
      requestStatus: 'requestStatus.value'
    }
  };

  const ky = useOkapiKy();

  const { data: { results: publicationRequests } = { } } = useQuery(
    ['ui-oa', 'oaRoute', 'publicationRequests', query],
    () => ky(`oa/publicationRequest${generateKiwtQuery(SASQ_MAP, query)}`).json()
  );

  return (
    <PublicationRequests
      data={{ publicationRequests }}
      queryGetter={queryGetter}
      querySetter={querySetter}
      searchString={location.search}
    >
      {children}
    </PublicationRequests>
  );
};

PublicationRequestsRoute.propTypes = propTypes;

export default PublicationRequestsRoute;
