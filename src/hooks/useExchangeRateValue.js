import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

const useExchangeRateValue = (exchangeFrom, exchangeTo, manualExchangeRate) => {
  const ky = useOkapiKy();

  const searchParams = {
    from: exchangeFrom,
    to: exchangeTo,
  };

  const { data, isLoading, refetch } = useQuery(
    ['exchange-rate-value', searchParams],
    () => ky.get('finance/exchange-rate', { searchParams }).json(),
    { enabled: !manualExchangeRate }
  );

  const [exchangeRate, setExchangeRate] = useState();
  useEffect(() => {
    if (!isLoading) {
      setExchangeRate(data);
    }
  }, [data, isLoading]);

  return {
    exchangeRate: exchangeRate?.exchangeRate || null,
    isLoading,
    refetch,
  };
};

export default useExchangeRateValue;
