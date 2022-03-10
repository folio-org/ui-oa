const publicationRequest = {
  id: '709ac8b2-3730-49ec-9332-06c28d82e0fd',
  correspondences: [
    {
      id: 'ae2a5736-048d-4cfd-b448-2f27631db31a',
      correspondent: 'Test',
      dateOfCorrespondence: '2021-12-30',
      lastUpdated: '2021-12-30T16:51:34Z',
      owner: {
        id: 'db468f10-ab68-48ee-9cae-1acad0e89da7',
      },
      mode: {
        id: '8a8189847dc879fa017dc87a88500001',
        value: 'email',
        label: 'Email',
        owner: {
          id: '8a8189847dc879fa017dc87a88250000',
          desc: 'Correspondence.Mode',
          internal: true,
        },
      },
      category: {
        id: '8a8189847dc879fa017dc87a88a40004',
        value: 'invoice',
        label: 'Invoice',
        owner: {
          id: '8a8189847dc879fa017dc87a88a10003',
          desc: 'Correspondence.Category',
          internal: true,
        },
      },
      content: 'Test Description',
      status: {
        id: '8a8189847dc879fa017dc87a88d00007',
        value: 'awaiting_reply',
        label: 'Awaiting Reply',
        owner: {
          id: '8a8189847dc879fa017dc87a88cc0006',
          desc: 'Correspondence.Status',
          internal: true,
        },
      },
    },
  ],
  publisher: {
    id: '2c9180b07e6ade90017e6ae3bd130018',
    value: 'publisher_1',
    label: 'Publisher 1',
    owner: {
      id: '2c9180b07e6ade90017e6ae3bd0e0017',
      desc: 'PublicationRequest.Publisher',
      internal: false,
    },
  },
  dateCreated: '2022-01-18T10:05:21Z',
  correspondingAuthor: {
    id: 'bb6040e5-b574-4d99-97d5-c5d849c1ef64',
    partyOwner: {
      id: '7fc31e67-ee19-49ce-881b-de45935db7f4',
      title: 'Dr',
      mainEmail: 'Doug_Middleton2628@bulaffy.com',
      fullName: 'Doug Middleton',
      givenNames: 'Doug',
      familyName: 'Middleton',
    },
    role: {
      id: '2c9180b07e6ade90017e6ae3bcb3000b',
    },
  },
  lastUpdated: '2022-01-18T10:24:51Z',
  requestDate: '2022-01-01',
  doi: 'Test DOI',
  publicationType: {
    id: '2c9180b07e6ade90017e6ae3bd20001a',
    value: 'journal_article',
    label: 'Journal Article',
    owner: {
      id: '2c9180b07e6ade90017e6ae3bd1a0019',
      desc: 'PublicationRequest.PublicationType',
      internal: true,
    },
  },
  requestNumber: '1',
  requestContact: {
    id: '9f1d03c9-c479-496f-922d-16a5894b8a8c',
    partyOwner: {
      id: '7fc31e67-ee19-49ce-881b-de45935db7f4',
      title: 'Dr',
      mainEmail: 'Doug_Middleton2628@bulaffy.com',
      fullName: 'Doug Middleton',
      givenNames: 'Doug',
      familyName: 'Middleton',
    },
    role: {
      id: '2c9180b07e6ade90017e6ae3bcbd000c',
    },
  },
  license: {
    id: '2c9180b07e6ade90017e6ae3bd31001d',
    value: 'license_1',
    label: 'License 1',
    owner: {
      id: '2c9180b07e6ade90017e6ae3bd2e001c',
      desc: 'PublicationRequest.License',
      internal: false,
    },
  },
  identifiers: [
    {
      id: '1c78f224-fba5-4afe-a62f-98285c8bc622',
      publicationIdentifier: 'Test Identifier',
      type: {
        id: '2c9180b07e6ade90017e6ae3bc720002',
        value: 'pmid',
        label: 'PMID',
        owner: {
          id: '2c9180b07e6ade90017e6ae3bc010000',
          desc: 'PublicationIdentifier.Type',
          internal: false,
        },
      },
      owner: {
        id: '709ac8b2-3730-49ec-9332-06c28d82e0fd',
      },
    },
  ],
  publicationStatuses: [
    {
      id: 'b883a28a-deb8-42cb-bb07-cd9b6c1769db',
      publicationStatus: {
        id: '2c9180b07e6ade90017e6ae3bc7f0004',
        value: 'submitted',
        label: 'Submitted',
        owner: {
          id: '2c9180b07e6ade90017e6ae3bc7b0003',
          desc: 'PublicationStatus.PublicationStatus',
          internal: false,
        },
      },
      statusNote: 'Test Note 2',
      owner: {
        id: '709ac8b2-3730-49ec-9332-06c28d82e0fd',
      },
      statusDate: '2022-01-02',
    },
    {
      id: '80c92a66-43e8-40cc-be26-afadeb02128a',
      publicationStatus: {
        id: '2c9180b07e6ade90017e6ae3bc7f0004',
        value: 'submitted',
        label: 'Submitted',
        owner: {
          id: '2c9180b07e6ade90017e6ae3bc7b0003',
          desc: 'PublicationStatus.PublicationStatus',
          internal: false,
        },
      },
      statusNote: 'Test Note',
      owner: {
        id: '709ac8b2-3730-49ec-9332-06c28d82e0fd',
      },
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
  subtype: {
    id: '2c9180b07e6ade90017e6ae3bd3b001f',
    value: 'subtype_1',
    label: 'Subtype 1',
    owner: {
      id: '2c9180b07e6ade90017e6ae3bd37001e',
      desc: 'PublicationRequest.Subtype',
      internal: false,
    },
  },
  history: [],
  fundings: [
    {
      id: '6050ebc9-8e4c-487e-81bf-bc3cfee690e3',
      aspectFunded: {
        id: '8a8189af7dba0799017dba080ad6000b',
        value: 'publication',
        label: 'Publication',
        owner: {
          id: '8a8189af7dba0799017dba080abe0009',
          desc: 'Funding.AspectFunded',
          internal: true,
        },
      },
      lastUpdated: '2022-02-01T09:57:06Z',
      funder: {
        id: '8a8189af7dba0799017dba080af0000d',
        value: 'funder_1',
        label: 'Funder 1',
        owner: {
          id: '8a8189af7dba0799017dba080aea000c',
          desc: 'Funding.Funder',
          internal: true,
        },
      },
      owner: {
        id: '51d6bce3-6237-419c-8440-877f8cfd3c59',
      },
    },
    {
      id: 'd8086d83-9dc1-4536-ace9-ee04c138b9bf',
      aspectFunded: {
        id: '2c9180b07e6ade90017e6ae3bc8e0006',
        value: 'research',
        label: 'Research',
        owner: {
          id: '2c9180b07e6ade90017e6ae3bc890005',
          desc: 'Funding.AspectFunded',
          internal: true,
        },
      },
      lastUpdated: '2022-01-18T10:24:51Z',
      funder: {
        id: '2c9180b07e6ade90017e6ae3bca60009',
        value: 'funder_1',
        label: 'Funder 1',
        owner: {
          id: '2c9180b07e6ade90017e6ae3bca20008',
          desc: 'Funding.Funder',
          internal: false,
        },
      },
      owner: {
        id: '709ac8b2-3730-49ec-9332-06c28d82e0fd',
      },
    },
  ],
  requestStatus: {
    id: '2c9180b07e6ade90017e6ae3bd450021',
    value: 'new',
    label: 'New',
    owner: {
      id: '2c9180b07e6ade90017e6ae3bd420020',
      desc: 'PublicationRequest.RequestStatus',
      internal: true,
    },
  },
  publicationTitle: 'Test Publication',
  authorNames: 'Test Author',
  externalRequestIds: [
    {
      id: '0520c9c8-d94d-47ab-8f22-b9396238ce07',
      owner: {
        id: '709ac8b2-3730-49ec-9332-06c28d82e0fd',
      },
      externalId: 'Test 1',
    },
    {
      id: '66843b71-c179-4260-a90b-b3f126974f60',
      owner: {
        id: '51d6bce3-6237-419c-8440-877f8cfd3c59',
      },
      externalId: 'Test 2',
    },
  ],
  localReference: 'Test Reference',
  publicationUrl: 'Test Url',
};

const handlers = {
  onClose: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  onSubmit: jest.fn(),
};

export { publicationRequest, handlers };
