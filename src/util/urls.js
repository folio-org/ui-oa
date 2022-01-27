const urls = {
  journals: () => '/oa/journals',

  parties: () => '/oa/people',
  partyCreate: () => '/oa/people/create',
  partyEdit: id => `/oa/people/${id}/edit`,

  publicationRequests: () => '/oa/publicationRequests',
  publicationRequest: id => `/oa/publicationRequests/${id}`,
  publicationRequestCreate: () => '/oa/publicationRequests/create',
  publicationRequestEdit: id => `/oa/publicationRequests/${id}/edit`,

  publicationRequestCorrespondenceView: (prId, cId) => `/oa/publicationRequests/${prId}/correspondence/${cId}`,
  publicationRequestCorrespondenceCreate: prId => `/oa/publicationRequests/${prId}/correspondence/create`,
  publicationRequestCorrespondenceEdit: (prId, cId) => `/oa/publicationRequests/${prId}/correspondence/${cId}/edit`
};

export default urls;
