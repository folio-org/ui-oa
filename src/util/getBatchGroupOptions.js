const getBatchGroupsOptions = (batchGroups = []) => batchGroups.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  export default getBatchGroupsOptions;
