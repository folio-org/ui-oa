import { useState, useEffect } from 'react';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';

const useBatchGroup = (batchGroupId) => {
  const ky = useOkapiKy();

  const { data, isLoading } = useQuery(
    ['ui-oa', 'invoiceHooks', 'useBatchGroup'],
    () => ky(`batch-groups/${batchGroupId}`).json()
  );

  const [batchGroup, setBatchGroup] = useState();
  useEffect(() => {
    if (!isLoading) {
      setBatchGroup(data);
    }
  }, [data, isLoading]);
  return batchGroup;
};

const useVendorOrg = (vendorId) => {
  const ky = useOkapiKy();

  const { data, isLoading } = useQuery(
    ['ui-oa', 'invoiceHooks', 'useVendorOrg'],
    () => ky(`organizations/organizations/${vendorId}`).json()
  );

  const [vendorOrg, setVendorOrg] = useState();
  useEffect(() => {
    if (!isLoading) {
      setVendorOrg(data);
    }
  }, [data, isLoading]);
  return vendorOrg;
};

export { useBatchGroup, useVendorOrg };
