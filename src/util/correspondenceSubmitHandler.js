const correspondenceSubmitHandler = (values) => {
  const { status, mode, category, ...submitValues } = { ...values };
  if (status?.value) {
  submitValues.status = status.value;
  }
  if (mode?.value) {
    submitValues.mode = mode.value;
  }
  if (category?.value) {
    submitValues.category = category.value;
  }
  return submitValues;
};

export default correspondenceSubmitHandler;
