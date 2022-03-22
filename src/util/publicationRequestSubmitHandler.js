const publicationRequestSubmitHandler = (values) => {
  const {
    agreement,
    useCorrespondingAuthor: _useCorrespondingAuthor,
    correspondingAuthor,
    requestContact,
    work,
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

  if (agreement?.remoteId) {
    submitValues.agreement = agreement;
  } else {
    submitValues.agreement = null;
  }

  if (work) {
    submitValues.work = {
      id: work.id
    };
  } else {
    submitValues.work = {
      id: ''
    };
  }

  return submitValues;
};

export default publicationRequestSubmitHandler;
