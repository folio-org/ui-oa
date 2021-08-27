import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';
import {
  useQuery,
} from 'react-query';
import generateKiwtQuery from '../util/generateKiwtQuery';
import OAView from '../components/OAView';
import useKiwtSASQuery from '../util/useKiwtSASQuery';

const propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  // history: PropTypes.object,
  // resources: PropTypes.object,
};

const OARoute = ({ children, location }) => {
  const { query, queryGetter, querySetter } = useKiwtSASQuery();

  const SASQ_MAP = {
    searchKey: 'journalVolume',
    filterKeys: {
      journalVolume: 'journalVolume'
    }
  };

  const ky = useOkapiKy();

  const { data: { results: publicationRequests } = { } } = useQuery(
    ['ui-oa', 'oaRoute', 'publicationRequest', query],
    () => ky(`oa/publicationRequest${generateKiwtQuery(SASQ_MAP, query)}`).json()
  );

  return (
    <OAView
      data={{publicationRequests}}
      queryGetter={queryGetter}
      querySetter={querySetter}
      searchString={location.search}
    >
      {children}
    </OAView>
  );
};

OARoute.propTypes = propTypes;

export default OARoute;
