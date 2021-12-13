const getIdentifiers = (journal) => {
    return journal?.identifiers?.map(id => id.identifier);
};

const findIdentifierByNamespace = (journal, namespace) => {
    if (journal) {
        return getIdentifiers(journal).find(element => element?.ns?.value === namespace);
      }
      return null;
};

export { findIdentifierByNamespace, getIdentifiers };
