import { useIntl } from 'react-intl';

const usePaymentOptions = () => {
  const intl = useIntl();
  return [
    {
      value: 'Cash',
      label: intl.formatMessage({ id: 'ui-oa.charge.paymentMethod.cash' }),
    },
    {
      value: 'Credit Card',
      label: intl.formatMessage({ id: 'ui-oa.charge.paymentMethod.card' }),
    },
    {
      value: 'EFT',
      label: intl.formatMessage({ id: 'ui-oa.charge.paymentMethod.eft' }),
    },
    {
      value: 'Deposit Account',
      label: intl.formatMessage({
        id: 'ui-oa.charge.paymentMethod.depAccount',
      }),
    },
    {
      value: 'Physical Check',
      label: intl.formatMessage({
        id: 'ui-oa.charge.paymentMethod.physicalCheck',
      }),
    },
    {
      value: 'Bank Draft',
      label: intl.formatMessage({ id: 'ui-oa.charge.paymentMethod.bankDraft' }),
    },

    {
      value: 'Internal Transfer',
      label: intl.formatMessage({
        id: 'ui-oa.charge.paymentMethod.internalTransfer',
      }),
    },
    {
      value: 'Other',
      label: intl.formatMessage({ id: 'ui-oa.charge.paymentMethod.other' }),
    },
  ];
};

export default usePaymentOptions;
