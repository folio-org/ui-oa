const filterSelectValues = (value, dataOptions) => {
  const regex = new RegExp(value, 'i');

  return dataOptions.filter(({ label }) => label.search(regex) !== -1);
};

export default filterSelectValues;
