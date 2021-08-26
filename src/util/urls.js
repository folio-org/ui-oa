const urls = {
  publicationRequests: () => '/oa',
  publicationRequest: id => `/oa/${id}`,
  publicationRequestCreate: () => '/oa/publicationRequests/create'
};

export default urls;
