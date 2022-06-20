const getEstimatedInvoicePrice = (values) => {
  // Taken from MOA-OA from function of same name
  const baseAmount = values?.amount?.value || 0;
  if (values?.discountType?.value === 'subtracted') {
    // STATIC DISCOUNT
    return (
      (baseAmount - (values?.discount || 0)) * (1 + (values?.tax || 0) / 100)
    );
    // value = amount.value.subtract(discount).multiply(getTaxMultiplicand())
  } else {
    // PERCENTAGE DISCOUNT
    return (
      (baseAmount - baseAmount * ((values?.discount || 0) / 100)) *
      (1 + (values?.tax || 0) / 100)
    );
    // value = amount.value.subtract((amount.value.multiply(discount.divide(ONE_HUNDRED)))).multiply(getTaxMultiplicand())
  }
};

const getTotalPayersAmount = (payers) => {
  return (
    payers?.reduce((a, b) => {
      return a + (Number(b.payerAmount) || 0);
    }, 0) || 0
  );
};

export { getTotalPayersAmount, getEstimatedInvoicePrice };
