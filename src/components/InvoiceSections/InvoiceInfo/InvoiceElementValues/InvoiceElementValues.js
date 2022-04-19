import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { KeyValue, Loading } from '@folio/stripes/components';

import { useBatchGroup, useVendorOrg } from '../../../../hooks/invoiceHooks';

const propTypes = {
  invoice: PropTypes.object,
};

const BatchGroupValue = ({ invoice }) => {
  const { batchGroup, isFetching } = useBatchGroup(invoice?.batchGroupId);
  return (
    <KeyValue
      label={<FormattedMessage id="ui-oa.charge.invoice.batchGroup" />}
      value={isFetching ? <Loading /> : batchGroup?.name}
    />
  );
};

const VendorOrgValue = ({ invoice }) => {
  const { vendorOrg, isFetching } = useVendorOrg(invoice?.vendorId);
  return (
    <KeyValue
      label={<FormattedMessage id="ui-oa.charge.invoice.vendorOrganisation" />}
      value={isFetching ? <Loading /> : vendorOrg?.name}
    />
  );
};

BatchGroupValue.propTypes = propTypes;
VendorOrgValue.propTypes = propTypes;

export { BatchGroupValue, VendorOrgValue };
