import { useOkapiKy } from '@folio/stripes/core';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';
import { useQuery } from 'react-query';
import { REPORT_ENDPOINT } from '../constants/endpoints';

const useGenerateReport = (values, queryOptions) => {
  const ky = useOkapiKy();

  const paramMap = {
    institution: values?.institution?.value,
    paymentPeriod: values?.paymentPeriod,
    chargeCategory: values?.chargeCategories,
    chargeStatus: values?.chargeStatuses,
  };

  const queryParams = generateKiwtQueryParams(paramMap, {});

  const downloadBlob = () => (blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${values?.paymentPeriod}_${values?.institution?.value}_OpenAPC_Charges_Report.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const path = `${REPORT_ENDPOINT('openApcChargesReport')}?${queryParams.join('&')}`;

  const queryObject = useQuery(
    [path, 'ui-oa', 'useGenerateReport'],
    () => ky.get(path).blob().then(downloadBlob()),
    {
      enabled: false,
      cacheTime: 0,
      ...queryOptions,
    }
  );

  return {
    generate: queryObject.refetch,
    queryObject,
  };
};

export default useGenerateReport;
