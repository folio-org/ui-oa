const correspondence = {
    'id': 'ae2a5736-048d-4cfd-b448-2f27631db31a',
    'correspondent': 'Test',
    'dateOfCorrespondence': '2021-12-30',
    'lastUpdated': '2021-12-30T16:51:34Z',
    'owner': {
      'id': 'db468f10-ab68-48ee-9cae-1acad0e89da7'
    },
    'mode': {
      'id': '2c9180b17f432ae2017f432f6b71002c',
      'value': 'email',
      'label': 'Email',
      'owner': {
        'id': '2c9180b17f432ae2017f432f6b6d002b',
        'desc': 'Correspondence.Mode',
        'internal': true
      }
    },
    'category': {
      'id': '2c9180b17f432ae2017f432f6b7e002f',
      'value': 'invoice',
      'label': 'Invoice',
      'owner': {
        'id': '2c9180b17f432ae2017f432f6b7c002e',
        'desc': 'Correspondence.Category',
        'internal': true
      }
    },
    'content': 'Test Description',
    'status': {
      'id': '2c9180b17f432ae2017f432f6b8d0032',
      'value': 'awaiting_reply',
      'label': 'Awaiting Reply',
      'owner': {
        'id': '2c9180b17f432ae2017f432f6b8a0031',
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
