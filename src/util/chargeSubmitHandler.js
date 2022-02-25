const chargeSubmitHandler = (values) => {
    const { chargeStatus, payer, category, discountType, ...submitValues } = { ...values };
    if (chargeStatus?.value) {
    submitValues.chargeStatus = chargeStatus.value;
    }
    if (payer?.value) {
      submitValues.payer = payer.value;
    }
    if (category?.value) {
      submitValues.category = category.value;
    }
    if (discountType?.value) {
        submitValues.discountType = discountType.value;
      }
    return submitValues;
  };

  export default chargeSubmitHandler;
