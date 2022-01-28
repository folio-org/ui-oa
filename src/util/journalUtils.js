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

const findIdentifierByNamespace = (instance, namespace) => {
  return getIdentifiers(instance)?.find((element) => element?.ns?.value === namespace);
};


export { findIssnByNamespace, getIdentifiers, findSubtypeByNamespace, findIdentifierByNamespace };
