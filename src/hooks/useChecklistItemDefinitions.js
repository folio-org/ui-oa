import PropTypes from 'prop-types';

import { useQuery } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';
import { generateKiwtQuery } from '@k-int/stripes-kint-components';

import { CHECKLIST_ITEM_DEFINITIONS_ENDPOINT } from '../constants/endpoints';

const defaultOptions = {
  sort: [{ path: 'weight' }, { path: 'name' }],
  stats: false,
  max: 100
};

const useChecklistItemDefinitions = ({
  name,
  options = defaultOptions,
  queryParams,
  returnQueryObject = false,
} = {}) => {
  const ky = useOkapiKy();
  const queryNS = ['OA', 'ChecklistItemDefinitions'];

  const kiwtQueryOptions = options;

  if (name) {
    if (Array.isArray(name)) {
      // If we have an array, append a desc filter for each desc given
      kiwtQueryOptions.filters = name.map(d => ({ path: 'name', value: d }));
    } else {
      // If we just have a string, append a single desc filter
      kiwtQueryOptions.filters = [{ path: 'name', value: name }];
    }

    queryNS.push(name);
  }

  const query = generateKiwtQuery(options, {});
  const path = `${CHECKLIST_ITEM_DEFINITIONS_ENDPOINT}${query}`;

  const queryObject = useQuery(
    queryNS,
    () => ky(path).json(),
    queryParams
  );

  if (returnQueryObject) {
    return queryObject || {};
  }

  const { data: checklistItemDefinitions } = queryObject;
  return checklistItemDefinitions || [];
};

useChecklistItemDefinitions.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  queryParams: PropTypes.object,
  returnQueryObject: PropTypes.bool
};

export default useChecklistItemDefinitions;
