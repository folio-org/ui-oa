const findIdentifierByNamespace = (journal, namespace) => {
    return getIdentifiers(journal).find(element => element?.ns?.value === namespace)
}

const getIdentifiers = (journal) => {
    return journal?.identifiers?.map(id => id.identifier);
}

export { findIdentifierByNamespace, getIdentifiers };
