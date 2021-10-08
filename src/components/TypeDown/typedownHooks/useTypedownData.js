import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';

const useTypedownData = (callPath) => {
  const ky = useOkapiKy();

  const { data, isLoading } = useQuery(
    // Ensure when multiple apps are using this function that each one gets memoized individually
    ['stripes-kint-components', 'typedown', callPath],
    () => ky(callPath).json()
  );


  // Smooth out transitions while data changes by only displaying once call has been loaded.
  const [contentData, setContentData] = useState();
  useEffect(() => {
    if (!isLoading) {
      setContentData(data);
    }
  }, [data, isLoading]);

  return contentData;
};

export default useTypedownData;
