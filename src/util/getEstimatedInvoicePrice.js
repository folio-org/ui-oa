const getEstimatedInvoicePrice = (values) => {
  const baseAmount = values?.amount?.value || 0;
  if (values?.discountType?.value === 'percentage') {
    // PERCENTAGE DISCOUNT
    return (
      (baseAmount - baseAmount * (values?.discount / 100)) *
      (1 + (values?.tax || 0) / 100)
    );
    // value = amount.value.subtract((amount.value.multiply(discount.divide(ONE_HUNDRED)))).multiply(getTaxMultiplicand())
  }
  if (values?.discountType?.value === 'subtracted') {
    // STATIC DISCOUNT
    return (baseAmount - values?.discount) * (1 + (values?.tax || 0) / 100);
    // value = amount.value.subtract(discount).multiply(getTaxMultiplicand())
  }
  return null;
};

export default getEstimatedInvoicePrice;
