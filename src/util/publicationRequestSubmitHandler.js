const publicationRequestSubmitHandler = (values) => {
  const {
    useCorrespondingAuthor: _useCorrespondingAuthor,
    correspondingAuthor,
    requestContact,
    ...submitValues
  } = { ...values };

  // Explicitly set RequestParty values to null if no partyOwner, to allow unsetting of values
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

  return submitValues;
};

export default publicationRequestSubmitHandler;
