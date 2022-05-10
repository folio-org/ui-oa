const publicationRequestSubmitHandler = (values, journalArticleId) => {
  const submitValues = { ...values };
  const unsetValueArray = [
    'publicationType',
    'publisher',
    'subtype',
    'license',
    'workIndexedInDOAJ',
    'workOAStatus',
    'work',
  ];
  // For all ref data selects within the publicationrequest create page, allows for the unsetting of values
  // If the specified refdata does not have an id, then the entire property is set to null
  unsetValueArray.forEach((e) => {
    if (values?.[e]?.id) {
      submitValues[e] = values[e];
    } else {
      submitValues[e] = null;
    }
  });

  // If the publication type selector is set to journal/book, then the other publication type values are set to null upon saving
  if (values?.publicationType?.id) {
    if (values?.publicationType?.id === journalArticleId) {
      submitValues.bookDateOfPublication = null;
      submitValues.bookPlaceOfPublication = null;
    } else {
      submitValues.work = null;
      submitValues.workOAStatus = null;
      submitValues.workIndexedInDOAJ = null;
    }
  } else {
    submitValues.bookDateOfPublication = null;
    submitValues.bookPlaceOfPublication = null;
    submitValues.work = null;
    submitValues.workOAStatus = null;
    submitValues.workIndexedInDOAJ = null;
  }
  // Explicitly set RequestParty values to null if no partyOwner, to allow unsetting of values
  // Due to the amount of fields in publication request, this may need refactoring
  if (values?.requestContact?.partyOwner?.id) {
    values.requestContact.role = 'request_contact';
    submitValues.requestContact = values.requestContact;
  } else {
    submitValues.requestContact = null;
  }

  if (values?.correspondingAuthor?.partyOwner?.id) {
    values.correspondingAuthor.role = 'corresponding_author';
    submitValues.correspondingAuthor = values.correspondingAuthor;
  } else {
    submitValues.correspondingAuthor = null;
  }

  if (values?.agreement?.remoteId) {
    submitValues.agreement = values?.agreement;
  } else {
    submitValues.agreement = null;
  }

  return submitValues;
};

export default publicationRequestSubmitHandler;
