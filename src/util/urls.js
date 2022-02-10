const urls = {
  journals: () => '/oa/journals',
  journal: id => `/oa/journals/${id}`,

  parties: () => '/oa/people',
  party: id => `/oa/people/${id}`,
  partyCreate: () => '/oa/people/create',
  partyEdit: id => `/oa/people/${id}/edit`,

  publicationRequests: () => '/oa/publicationRequests',
  publicationRequest: id => `/oa/publicationRequests/${id}`,
  publicationRequestCreate: () => '/oa/publicationRequests/create',
  publicationRequestEdit: id => `/oa/publicationRequests/${id}/edit`,

  publicationRequestCorrespondenceView: (prId, cId) => `/oa/publicationRequests/${prId}/correspondence/${cId}`,
  publicationRequestCorrespondenceCreate: prId => `/oa/publicationRequests/${prId}/correspondence/create`,
  publicationRequestCorrespondenceEdit: (prId, cId) => `/oa/publicationRequests/${prId}/correspondence/${cId}/edit`,

  publicationRequestChargeCreate: prId => `/oa/publicationRequests/${prId}/charge/create`
};

export default urls;
