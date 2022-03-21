import { useState, useEffect } from 'react';

import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';

const useTypedownData = (callPath) => {
  const ky = useOkapiKy();

  const { data, isLoading } = useQuery(
    ['ui-oa', 'useTypedownData', callPath],
    () => ky(callPath).json()
  );

  const [contentData, setContentData] = useState();
  useEffect(() => {
    if (!isLoading) {
      setContentData(data);
    }
  }, [data, isLoading]);
  return contentData;
};

export default useTypedownData;
