const getEstimatedInvoicePrice = (values) => {
  // Taken from MOA-OA from function of same name
  let estimatedInvoicePrice = 0;
  const baseAmount = values?.amount?.value || 0;
  if (values?.discountType?.value === 'subtracted') {
    // STATIC DISCOUNT
    estimatedInvoicePrice =
      (baseAmount - (values?.discount || 0)) * (1 + (values?.tax || 0) / 100);
    // value = amount.value.subtract(discount).multiply(getTaxMultiplicand())
  } else {
    // PERCENTAGE DISCOUNT
    estimatedInvoicePrice =
      (baseAmount - baseAmount * ((values?.discount || 0) / 100)) *
      (1 + (values?.tax || 0) / 100);
    // value = amount.value.subtract((amount.value.multiply(discount.divide(ONE_HUNDRED)))).multiply(getTaxMultiplicand())
  }

  return estimatedInvoicePrice.toFixed(2);
};

const getTotalPayersAmount = (payers) => {
  return (
    payers?.reduce((a, b) => {
      return a + (Number(b.payerAmount) || 0);
    }, 0) || 0
  ).toFixed(2);
};

const calculateTaxAmount = (tax, netAmount) => {
  return ((tax * netAmount) / 100).toFixed(2);
};

const calculateDiscountAmount = (values, amount) => {
  if (values?.discountType?.value === 'subtracted') {
    return values?.discount || 0;
  } else {
    return (amount * ((values?.discount || 0) / 100)).toFixed(2);
  }
};

export {
  getTotalPayersAmount,
  getEstimatedInvoicePrice,
  calculateTaxAmount,
  calculateDiscountAmount,
};
