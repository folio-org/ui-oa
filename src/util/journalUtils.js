const getIdentifiers = (journal) => {
  return journal?.identifiers?.map((id) => id.identifier);
};

const findAssociatedIssn = (journal, namespace) => {
  const instance = findSubtypeByNamespace(journal, namespace)
  return getIdentifiers(instance)?.find((element) => element?.ns?.value === 'issn');
};

const findSubtypeByNamespace = (journal, namespace) => {
  return journal?.instances.find((element) => element?.subType?.value === namespace);
};


export { findAssociatedIssn, getIdentifiers, findSubtypeByNamespace };
