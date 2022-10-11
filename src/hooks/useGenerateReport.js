import { useOkapiKy } from '@folio/stripes/core';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { REPORT_ENDPOINT } from '../constants/endpoints';

const useGenerateReport = (queryOptions) => {
  const [values, setValues] = useState();
  const ky = useOkapiKy();

  const paramMap = {
    institution: values?.institution?.value,
    paymentPeriod: values?.paymentPeriod,
    chargeCategory: values?.chargeCategory,
    chargeStatus: values?.chargeStatus,
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
    setValues();
  };

  const path = `${REPORT_ENDPOINT('openApcChargesReport')}?${queryParams.join('&')}`;

  const queryObject = useQuery(
    [values, path, 'ui-oa', 'useGenerateReport'],
    () => ky
        .get(path)
        .blob()
        .then(downloadBlob()),
    {
      enabled: !!values,
      cacheTime: 0,
      ...queryOptions,
    }
  );

  return {
    generate: setValues,
    queryObject,
  };
};

export default useGenerateReport;
