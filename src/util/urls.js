const urls = {
  agreementView: id => `/erm/agreements/${id}`,

  publicationRequests: () => '/oa/publicationRequests',
  publicationRequest: id => `/oa/publicationRequests/${id}`,
  publicationRequestCreate: () => '/oa/publicationRequests/create',
  publicationRequestEdit: id => `/oa/publicationRequests/${id}/edit`,

  publicationRequestCorrespondenceView: (prId, cId) => `/oa/publicationRequests/${prId}/correspondence/${cId}`,
  publicationRequestCorrespondenceCreate: prId => `/oa/publicationRequests/${prId}/correspondence/create`,
  publicationRequestCorrespondenceEdit: (prId, cId) => `/oa/publicationRequests/${prId}/correspondence/${cId}/edit`
};

export default urls;
