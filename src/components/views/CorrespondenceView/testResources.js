const initialValues = {
    'id': '3d698c78-892b-434e-bfb2-734aceaa5554',
    'correspondent': 'Test 2',
    'dateOfCorrespondence': '2021-12-01',
    'lastUpdated': '2021-12-31T10:15:14Z',
    'owner': {
        'id': '0caf5569-9b41-4875-87dd-73c1c5841c71'
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
    'content': 'Test 2',
    'status': {
        'id': '8a8189847dc879fa017dc87a88ee0009',
        'value': 'closed',
        'label': 'Closed',
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
};
export { initialValues, handlers };
