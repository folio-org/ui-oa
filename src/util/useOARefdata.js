import React from 'react';
import { useRefdata } from '@k-int/stripes-kint-components';

const useOARefdata = (desc) => {
  const refdata = useRefdata({ desc, endpoint: 'oa/refdata' });

  if (Array.isArray(desc)) {
    // We're fetching a set of refdataValues, return them with all information
    return refdata;
  }

  // Otherwise we're fetching a single set of values, so return just the values;
  const {
    0: {
      values = []
    } = {}
  } = refdata;

  return values;
};

export default useOARefdata;
