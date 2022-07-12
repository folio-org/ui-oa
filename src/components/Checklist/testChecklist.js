const testChecklist = {
  name: 'PublicationRequest1',
  items: {
    authorAffiliated: {
      id: '4a3c0b81-7b02-44f9-bb44-2c0164680760',
      label: 'Author affiliated',
      description: 'Affiliate an author with this request',
      outcome: 'not_done',
      status: 'required',
      dateCreated: '2022-07-07T10:52:08Z',
      lastUpdated: '2022-07-07T10:52:08Z',
      weight: 2,
      notes: [
        {
          id: '2c9180b381f018c60181f01cef98002a',
          note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquam, tortor vel auctor condimentum, turpis mi molestie erat, id facilisis justo tellus in sapien. Aenean magna felis, mollis in orci a, elementum iaculis felis. Praesent lectus neque, vulputate ut orci in, consequat scelerisque est. Fusce eleifend erat nibh, ac mattis nisl pellentesque a. Suspendisse vel ligula tristique, auctor justo vitae, facilisis orci. Ut vel gravida felis, et interdum odio.',
          dateCreated: '2024-10-07T09:22:59Z',
          lastUpdated: '2024-10-07T10:52:08Z',
        },
        {
          id: '4a3c0b81-7b02-44f9-bb44-2c0164680760',
          note: 'Author said to await reponse from XYZ',
          dateCreated: '2023-08-07T09:22:59Z',
          lastUpdated: '2023-08-07T10:52:08Z',
        },
      ],
    },
    journalEligible: {
      id: '2c9180b381f018c60181f01cef98002a',
      label: 'Journal eligible',
      description: 'Ensure that the selected journal is eligible',
      outcome: 'done',
      status: 'required',
      dateCreated: '2022-09-07T09:22:59Z',
      lastUpdated: '2022-09-07T10:52:08Z',
      weight: 1,
      notes: [
        {
          id: '2c9180b381f018c60181f01cef98002a',
          note: 'Journal Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquam, tortor vel auctor condimentum, turpis mi molestie erat',
          dateCreated: '2022-10-07T09:22:59Z',
          lastUpdated: '2022-10-07T10:52:08Z',
        },
      ],
    },
    requestInvoiced: {
      label: 'Request invoiced',
      description: 'Invoice the charges for the request',
      outcome: 'other',
      status: 'required',
      dateCreated: '2027-01-07T09:22:59Z',
      lastUpdated: '2028-01-07T10:52:08Z',
      weight: 0,
    },
  },
};

export default testChecklist;
