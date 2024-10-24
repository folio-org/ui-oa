import { correspondence } from './correspondence';
import { party2 } from './party';
import { journal } from './journal';
import refdata from './refdata';

const publicationRequest = {
  id: '709ac8b2-3730-49ec-9332-06c28d82e0fd',
  correspondences: [correspondence],
  publisher: refdata
    ?.find((rdc) => rdc.desc === 'PublicationRequest.Publisher')
    ?.values?.find((rdv) => rdv?.value === 'publisher_1'),
  dateCreated: '2022-01-18T10:05:21Z',
  correspondingAuthor: {
    id: 'bb6040e5-b574-4d99-97d5-c5d849c1ef64',
    partyOwner: party2,
    role: refdata
      ?.find((rdc) => rdc.desc === 'RequestParty.Role')
      ?.values?.find((rdv) => rdv?.value === 'corresponding_author'),
  },
  lastUpdated: '2022-01-18T10:24:51Z',
  requestDate: '2022-01-01',
  doi: 'Test DOI',
  publicationType: {
    id: '2c9180b382668a1a0182668e6bef000c',
    value: 'journal_article',
    label: 'Journal Article',
  },
  requestNumber: '1',
  requestContact: {
    id: '9f1d03c9-c479-496f-922d-16a5894b8a8c',
    partyOwner: party2,
    role: refdata
      ?.find((rdc) => rdc.desc === 'RequestParty.Role')
      ?.values?.find((rdv) => rdv?.value === 'request_contact'),
  },
  license: refdata
    ?.find((rdc) => rdc.desc === 'PublicationRequest.License')
    ?.values?.find((rdv) => rdv?.value === 'license_1'),
  identifiers: [
    {
      id: '1c78f224-fba5-4afe-a62f-98285c8bc622',
      publicationIdentifier: 'Test Identifier',
      type: refdata
        ?.find((rdc) => rdc.desc === 'PublicationIdentifier.Type')
        ?.values?.find((rdv) => rdv?.value === 'pmid'),
    },
  ],
  publicationStatuses: [
    {
      id: 'b883a28a-deb8-42cb-bb07-cd9b6c1769db',
      publicationStatus: refdata
        ?.find((rdc) => rdc.desc === 'PublicationStatus.PublicationStatus')
        ?.values?.find((rdv) => rdv?.value === 'submitted'),
      statusNote: 'Test Note 2',
      statusDate: '2022-01-02',
    },
    {
      id: '80c92a66-43e8-40cc-be26-afadeb02128a',
      publicationStatus: refdata
        ?.find((rdc) => rdc.desc === 'PublicationStatus.PublicationStatus')
        ?.values?.find((rdv) => rdv?.value === 'submitted'),
      statusNote: 'Test Note',
      statusDate: '2022-01-01',
    },
  ],
  withoutAgreement: false,
  agreement: {
    id: '8a8189b27e7315ee017e7739d6c60000',
    owner: { id: '51d6bce3-6237-419c-8440-877f8cfd3c59' },
    remoteId: '45c6cf86-363b-4ee4-8b99-d3082daf2f97',
    remoteId_object: {
      agreementStatus: {
        id: '8a81853f791989b00179198b17e00021',
        value: 'draft',
        label: 'Draft',
      },
      cancellationDeadline: null,
      customProperties: {
        AuthorIdentification: [
          {
            id: 2,
            publicNote: 'Test Public Note',
            note: 'Test Author ID NOTE',
            internal: true,
            value: {
              id: '2c91809c7f6c5909017f6c5fa4bf0057',
              value: 'ror_id',
              label: 'ROR ID',
            },
            type: {
              id: '2c91809c7f6c5909017f6c5fa55f0058',
              ctx: 'OpenAccess',
              name: 'AuthorIdentification',
              primary: true,
              category: {
                id: '2c91809c7f6c5909017f6c5fa4ad0050',
                desc: 'AuthIdent',
                internal: false,
                values: [
                  {
                    id: '2c91809c7f6c5909017f6c5fa4b60054',
                    value: 'over_institute',
                    label: 'Over Institute',
                  },
                  {
                    id: '2c91809c7f6c5909017f6c5fa4b90055',
                    value: 'over_ip_range',
                    label: 'Over IP Range',
                  },
                  {
                    id: '2c91809c7f6c5909017f6c5fa4b10052',
                    value: 'email_domain',
                    label: 'Email Domain',
                  },
                  {
                    id: '2c91809c7f6c5909017f6c5fa4b30053',
                    value: 'orcid',
                    label: 'ORCID',
                  },
                  {
                    id: '2c91809c7f6c5909017f6c5fa4bf0057',
                    value: 'ror_id',
                    label: 'ROR ID',
                  },
                  {
                    id: '2c91809c7f6c5909017f6c5fa4af0051',
                    value: 'other',
                    label: 'Other',
                  },
                  {
                    id: '2c91809c7f6c5909017f6c5fa4bc0056',
                    value: 'ringgold_id',
                    label: 'Ringgold ID',
                  },
                ],
              },
              defaultInternal: true,
              label: 'Author Identification',
              description: 'Author Identification',
              weight: 0,
              type: 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata',
            },
          },
        ],
        publishAgreement: [
          {
            id: 3,
            publicNote: 'Test Public Note',
            note: 'Test Internal Note',
            internal: true,
            value: 'Test Publishing Support prop',
            type: {
              id: '2c91809c7f6c5909017f6c5fa56e0059',
              ctx: 'OpenAccess',
              name: 'publishAgreement',
              primary: true,
              defaultInternal: true,
              label: 'Does this agreement support publishing',
              description: 'Does this agreement support publishing',
              weight: 0,
              type: 'com.k_int.web.toolkit.custprops.types.CustomPropertyText',
            },
          },
        ],
        testProp2: [
          {
            id: 4,
            publicNote: 'asdfasdf',
            note: 'Internal note value',
            internal: true,
            value: 'test',
            type: {
              id: '2c91809c7f6c5909017f6ed260e30063',
              name: 'testProp2',
              primary: true,
              defaultInternal: true,
              label: 'testProp2',
              description: 'testProp2',
              weight: -1,
              type: 'com.k_int.web.toolkit.custprops.types.CustomPropertyText',
            },
          },
        ],
      },
      dateCreated: '2021-11-16T11:40:35Z',
      description: 'Imported from LAS:eR on Tue Nov 16 11:40:35 UTC 2021',
      endDate: '2021-12-31',
      id: '45c6cf86-363b-4ee4-8b99-d3082daf2f97',
      lastUpdated: '2021-12-16T16:33:51Z',
      localReference: 'subscription:fb3cfff1-a83b-4f54-8eb8-5a19bb07c8a8',
      name: 'Bibliography of Asian Studies / BAS 2021',
      startDate: '2021-01-01',

      version: 3,
    },
    externalRequestIds: [],
  },
  subtype: refdata
    ?.find((rdc) => rdc.desc === 'PublicationRequest.Subtype')
    ?.values?.find((rdv) => rdv?.value === 'subtype_1'),
  history: [],
  fundings: [
    {
      id: '6050ebc9-8e4c-487e-81bf-bc3cfee690e3',
      aspectFunded: refdata
        ?.find((rdc) => rdc.desc === 'Funding.AspectFunded')
        ?.values?.find((rdv) => rdv?.value === 'publication'),
      lastUpdated: '2022-02-01T09:57:06Z',
      funder: refdata
        ?.find((rdc) => rdc.desc === 'Funding.Funder')
        ?.values?.find((rdv) => rdv?.value === 'funder_1'),
    },
    {
      id: 'd8086d83-9dc1-4536-ace9-ee04c138b9bf',
      aspectFunded: refdata
        ?.find((rdc) => rdc.desc === 'Funding.AspectFunded')
        ?.values?.find((rdv) => rdv?.value === 'research'),
      lastUpdated: '2022-01-18T10:24:51Z',
      funder: refdata
        ?.find((rdc) => rdc.desc === 'Funding.Funder')
        ?.values?.find((rdv) => rdv?.value === 'funder_1'),
    },
  ],
  requestStatus: refdata
    ?.find((rdc) => rdc.desc === 'PublicationRequest.RequestStatus')
    ?.values?.find((rdv) => rdv?.value === 'new'),
  publicationTitle: 'Test Publication',
  authorNames: 'Test Author',
  externalRequestIds: [
    {
      id: '0520c9c8-d94d-47ab-8f22-b9396238ce07',
      externalId: 'Test 1',
    },
    {
      id: '66843b71-c179-4260-a90b-b3f126974f60',
      externalId: 'Test 2',
    },
  ],
  localReference: 'Test Reference',
  publicationUrl: 'Test Url',
  work: journal,
};

const handlers = {
  onClose: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  onSubmit: jest.fn(),
};

export { publicationRequest, handlers };
