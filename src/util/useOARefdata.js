import React from 'react';
import { useRefdata } from '@k-int/stripes-kint-components';

const useOARefdata = (desc) => {
  const {
    0: {
      values = []
    } = {}
  } = useRefdata({ desc, endpoint: 'oa/refdata' });

  return values;
};

export default useOARefdata;
