const publicationRequestSubmitHandler = (values) => {
  const {
    agreement,
    publicationType,
    license,
    publisher,
    subtype,
    useCorrespondingAuthor: _useCorrespondingAuthor,
    correspondingAuthor,
    requestContact,
    work,
    workIndexedInDOAJ,
    workOAStatus,
    ...submitValues
  } = { ...values };

  // Explicitly set RequestParty values to null if no partyOwner, to allow unsetting of values
  // Due to the amount of fields in publication request, this may need refactoring
  if (requestContact?.partyOwner?.id) {
    requestContact.role = 'request_contact';
    submitValues.requestContact = requestContact;
  } else {
    submitValues.requestContact = null;
  }

  if (correspondingAuthor?.partyOwner?.id) {
    correspondingAuthor.role = 'corresponding_author';
    submitValues.correspondingAuthor = correspondingAuthor;
  } else {
    submitValues.correspondingAuthor = null;
  }

  if (agreement?.remoteId) {
    submitValues.agreement = agreement;
  } else {
    submitValues.agreement = null;
  }

  if (publicationType?.id) {
    submitValues.publicationType = publicationType;
  } else {
    submitValues.publicationType = null;
  }

  if (license?.id) {
    submitValues.license = license;
  } else {
    submitValues.license = null;
  }

  if (publisher?.id) {
    submitValues.publisher = publisher;
  } else {
    submitValues.publisher = null;
  }

  if (subtype?.id) {
    submitValues.subtype = subtype;
  } else {
    submitValues.subtype = null;
  }

  if (workIndexedInDOAJ?.id) {
    submitValues.workIndexedInDOAJ = workIndexedInDOAJ;
  } else {
    submitValues.workIndexedInDOAJ = null;
  }

  if (workOAStatus?.id) {
    submitValues.workOAStatus = workOAStatus;
  } else {
    submitValues.workOAStatus = null;
  }

  if (work) {
    submitValues.work = {
      id: work.id,
    };
  } else {
    submitValues.work = {
      id: null,
    };
  }

  return submitValues;
};

export default publicationRequestSubmitHandler;
