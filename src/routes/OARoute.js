import PropTypes from 'prop-types';
import { useOkapiKy } from '@folio/stripes/core';
import generateKiwtQuery from '../util/generateKiwtQuery';
import {
  useQuery,
} from 'react-query';
import OAView from '../components/OAView';
import useKiwtSASQuery from '../util/useKiwtSASQuery';

const propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  history: PropTypes.object,
  resources: PropTypes.object,
};

const OARoute = ({ children, history, location, match }) => {
  const { query, queryGetter, querySetter } = useKiwtSASQuery();

  const SASQ_MAP = {
    searchKey: 'journalVolume',
    filterKeys: {
      journalVolume: 'journalVolume'
    }
  }

  const ky = useOkapiKy();
  const { data: {results: scholarlyWorks} = {} } = useQuery(
    ['ui-oa', 'oaRoute', 'scholarlyWork', query],
    () => ky(`oa/scholarlyWork${generateKiwtQuery(SASQ_MAP, query)}`).json()
  )

  return (
    <OAView
      data={{
        scholarlyWorks
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

export default OARoute;
