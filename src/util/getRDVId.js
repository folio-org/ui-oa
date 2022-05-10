const getRDVId = (refdataValues, desc, value) => {
    // First filter by desc
    const refdataDescValues = refdataValues?.find((rdc) => rdc.desc === desc);
    // Then grab the values and filter by value
    const refdataValue = refdataDescValues?.values?.find(
      (rdv) => rdv.value === value
    );
    // At this point we have the refdataValue object, which is an id, a value and a label (or undefined).
    // Return the id
    return refdataValue?.id;
  };

export default getRDVId;
