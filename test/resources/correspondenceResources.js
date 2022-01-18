const correspondence = {
    'id': 'ae2a5736-048d-4cfd-b448-2f27631db31a',
    'correspondent': 'Test',
    'dateOfCorrespondence': '2021-12-30',
    'lastUpdated': '2021-12-30T16:51:34Z',
    'owner': {
      'id': 'db468f10-ab68-48ee-9cae-1acad0e89da7'
    },
    'mode': {
      'id': '8a8189847dc879fa017dc87a88500001',
      'value': 'email',
      'label': 'Email',
      'owner': {
        'id': '8a8189847dc879fa017dc87a88250000',
        'desc': 'Correspondence.Mode',
        'internal': true
      }
    },
    'category': {
      'id': '8a8189847dc879fa017dc87a88a40004',
      'value': 'invoice',
      'label': 'Invoice',
      'owner': {
        'id': '8a8189847dc879fa017dc87a88a10003',
        'desc': 'Correspondence.Category',
        'internal': true
      }
    },
    'content': 'Test Description',
    'status': {
      'id': '8a8189847dc879fa017dc87a88d00007',
      'value': 'awaiting_reply',
      'label': 'Awaiting Reply',
      'owner': {
        'id': '8a8189847dc879fa017dc87a88cc0006',
        'desc': 'Correspondence.Status',
        'internal': true
      }
    }
  };

  const handlers = {
    onClose: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    onSubmit: jest.fn(),
};
  export { correspondence, handlers };
