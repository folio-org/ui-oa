const getIdentifiers = (journal) => {
  return journal?.identifiers?.map((id) => id.identifier);
};

const findSubtypeByNamespace = (journal, namespace) => {
  return journal?.instances.find((element) => element?.subType?.value === namespace);
};

const findIssnByNamespace = (journal, namespace) => {
  const instance = findSubtypeByNamespace(journal, namespace);
  return getIdentifiers(instance)?.find((element) => element?.ns?.value === 'issn');
};


export { findIssnByNamespace, getIdentifiers, findSubtypeByNamespace };
