import React from 'react';
import { useRefdata, refdataOptions } from '@k-int/stripes-kint-components';

import { REFDATA_ENDPOINT } from '../constants';

const useOARefdata = (desc) => {
  const refdata = useRefdata({
    desc,
    endpoint: REFDATA_ENDPOINT,
    options: { ...refdataOptions, sort: [{ path: 'desc' }] }
  });

  if (Array.isArray(desc)) {
    // We're fetching a set of refdataValues, return them with all information
    return refdata;
  }

  if (desc) {
    // Otherwise we're fetching a single set of values, so return just the values;
    const {
      0: {
        values = []
      } = {}
    } = refdata;
    return values;
  } else {
    return refdata;
  }
};

export default useOARefdata;
