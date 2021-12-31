const getIdentifiers = (journal) => {
  return journal?.identifiers?.map((id) => id.identifier);
};

const findIdentifierByNamespace = (journal, namespace) => {
  return getIdentifiers(journal)?.find((element) => element?.ns?.value === namespace);
};

const findSubtypeByNamespace = (journal, namespace) => {
  return journal?.instances.find((element) => element?.subType?.value === namespace);
};


export { findIdentifierByNamespace, getIdentifiers, findSubtypeByNamespace };
