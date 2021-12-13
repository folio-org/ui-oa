const getIdentifiers = (journal) => {
  return journal?.identifiers?.map((id) => id.identifier);
};

const findIdentifierByNamespace = (journal, namespace) => {
  if (!journal) {
    return null;
  }
  return getIdentifiers(journal).find(
    (element) => element?.ns?.value === namespace
  );
};

export { findIdentifierByNamespace, getIdentifiers };
