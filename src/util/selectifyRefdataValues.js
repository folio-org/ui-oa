const selectifyRefdata = (refdataRecords) => (
  refdataRecords
    .map(obj => (
      { label: obj.label, value: obj.id }
    ))
);

export default selectifyRefdata;
