import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

const useExchangeRateValue = (exchangeFrom, exchangeTo, manualExchangeRate) => {
  const ky = useOkapiKy();

  const searchParams = {
    from: exchangeFrom,
    to: exchangeTo,
  };

  const { data } = useQuery(
    ['exchange-rate-value', searchParams],
    () => ky.get('finance/exchange-rate', { searchParams }).json(),
    { enabled: !manualExchangeRate }
  );

  return data?.exchangeRate;
};

export default useExchangeRateValue;
