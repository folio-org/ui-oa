import { useOkapiKy } from '@folio/stripes/core';
import { useMutation } from 'react-query';

const useGenerateReport = () => {
  const ky = useOkapiKy();

  const { mutateAsync: generateReport } = useMutation(
    ['ui-oa', 'useGenerateReport', 'generateReport'],
    (path) => ky.get(path)
  );

  return generateReport;
};

export default useGenerateReport;
