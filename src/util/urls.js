const urls = {

  journals: () => '/oa/journals',
  journal: id => `/oa/journals/${id}`,
  journalEdit: id => `/oa/journals/${id}/edit`,

  parties: () => '/oa/people',
  party: id => `/oa/people/${id}`,
  partyCreate: () => '/oa/people/create',
  partyEdit: id => `/oa/people/${id}/edit`,

  invoice: id => `/invoice/view/${id}`,
  invoiceLine: (invoiceId, lineId) => `/invoice/view/${invoiceId}/line/${lineId}/view`,

  publicationRequests: () => '/oa/publicationRequests',
  publicationRequest: id => `/oa/publicationRequests/${id}`,
  publicationRequestCreate: () => '/oa/publicationRequests/create',
  publicationRequestEdit: id => `/oa/publicationRequests/${id}/edit`,

  publicationRequestCorrespondenceView: (prId, cId) => `/oa/publicationRequests/${prId}/correspondence/${cId}`,
  publicationRequestCorrespondenceCreate: prId => `/oa/publicationRequests/${prId}/correspondence/create`,
  publicationRequestCorrespondenceEdit: (prId, cId) => `/oa/publicationRequests/${prId}/correspondence/${cId}/edit`,

  publicationRequestChargeView: (prId, chId) => `/oa/publicationRequests/${prId}/charge/${chId}`,
  publicationRequestChargeLinkInvoice: (prId, chId) => `/oa/publicationRequests/${prId}/charge/${chId}/linkInvoice`,
  publicationRequestChargeCreate: prId => `/oa/publicationRequests/${prId}/charge/create`,
  publicationRequestChargeEdit: (prId, chId) => `/oa/publicationRequests/${prId}/charge/${chId}/edit`,

  settingsChecklistItems: () => '/settings/oa/checklist-items'

};

export default urls;
