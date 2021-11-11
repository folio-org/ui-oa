
// TODO this can probably be moved to stripes-kint-components
const selectifyRefdata = (refdataRecords, category) => {
  if (category) {
    // If a category is provided then the incoming refdata will be a different shape
    return (
      refdataRecords
        .filter(obj => obj.desc === category)
        .map(obj => (
          obj.values.map(entry => ({ label: entry.label, value: entry.id }))
        ))[0]
    );
  }

  return (
    refdataRecords
    .map(obj => (
      { label: obj.label, value: obj.id }
    ))
  );
};

export default selectifyRefdata;
