export const PARTIES_ENDPOINT = 'oa/party';
export const PARTY_ENDPOINT = (partyId) => `${PARTIES_ENDPOINT}/${partyId}`;

export const PUBLICATION_REQUESTS_ENDPOINT = 'oa/publicationRequest';
export const PUBLICATION_REQUEST_ENDPOINT = (publicationRequestId) => `${PUBLICATION_REQUESTS_ENDPOINT}/${publicationRequestId}`;

export const CHARGES_ENDPOINT = 'oa/charges';
export const CHARGE_ENDPOINT = (chargeId) => `${CHARGES_ENDPOINT}/${chargeId}`;

export const WORKS_ENDPOINT = 'oa/works';
export const WORK_ENDPOINT = (workId) => `${WORKS_ENDPOINT}/${workId}`;
export const WORK_CITATION_ENDPOINT = `${WORKS_ENDPOINT}/citation`;

export const CORRESPONDENCES_ENDPOINT = 'oa/correspondence';
export const CORRESPONDENCE_ENDPOINT = (correspondenceId) => `${CORRESPONDENCES_ENDPOINT}/${correspondenceId}`;

export const REFDATA_ENDPOINT = 'oa/refdata';
export const SETTINGS_ENDPOINT = 'oa/settings/appSettings';

export const CHECKLIST_ITEM_DEFINITIONS_ENDPOINT = 'oa/checklistItems';

export const REPORT_ENDPOINT = (reportName) => `oa/reports/${reportName}`;
