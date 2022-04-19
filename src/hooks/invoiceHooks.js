import { useState, useEffect } from 'react';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';

const useBatchGroup = (batchGroupId) => {
  const ky = useOkapiKy();

  const { data, isFetching } = useQuery(
    ['ui-oa', 'invoiceHooks', 'useBatchGroup', batchGroupId],
    () => ky(`batch-groups/${batchGroupId}`).json()
  );

  return { batchGroup: data, isFetching };
};

const useVendorOrg = (vendorId) => {
  const ky = useOkapiKy();

  const { data, isFetching } = useQuery(
    ['ui-oa', 'invoiceHooks', 'useVendorOrg', vendorId],
    () => ky(`organizations/organizations/${vendorId}`).json()
  );

  return { vendorOrg: data, isFetching };
};

const useInvoice = (invoiceId) => {
  const ky = useOkapiKy();

  const { data, isLoading } = useQuery(
    ['ui-oa', 'invoiceHooks', 'useInvoice', invoiceId],
    () => ky(`invoice/invoices/${invoiceId}`).json()
  );

  const [invoice, setInvoice] = useState();
  useEffect(() => {
    if (!isLoading) {
      setInvoice(data);
    }
  }, [data, isLoading]);
  return invoice;
};

const useInvoiceLine = (invoiceLineId) => {
  const ky = useOkapiKy();

  const { data, isLoading } = useQuery(
    ['ui-oa', 'invoiceHooks', 'useInvoice', invoiceLineId],
    () => ky(`invoice/invoice-lines/${invoiceLineId}`).json()
  );

  const [invoiceLine, setInvoiceLine] = useState();
  useEffect(() => {
    if (!isLoading) {
      setInvoiceLine(data);
    }
  }, [data, isLoading]);
  return invoiceLine;
};

export { useBatchGroup, useVendorOrg, useInvoice, useInvoiceLine };
