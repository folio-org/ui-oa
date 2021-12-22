const urls = {
  publicationRequests: () => '/oa/publicationRequests',
  publicationRequest: id => `/oa/publicationRequests/${id}`,
  publicationRequestCreate: () => '/oa/publicationRequests/create',
  publicationRequestEdit: id => `/oa/publicationRequests/${id}/edit`,

  publicationRequestCorrespondanceView: (prId, cId) => `/oa/publicationRequests/${prId}/correspondance/${cId}`,
  publicationRequestCorrespondanceCreate: prId => `/oa/publicationRequests/${prId}/correspondance/create`,
  publicationRequestCorrespondanceEdit: (prId, cId) => `/oa/publicationRequests/${prId}/correspondance/${cId}/edit`
};

export default urls;
