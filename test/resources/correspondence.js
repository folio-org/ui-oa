import refdata from './refdata';

const correspondence = {
    'id': 'ae2a5736-048d-4cfd-b448-2f27631db31a',
    'correspondent': 'Test',
    'dateOfCorrespondence': '2021-12-30',
    'lastUpdated': '2021-12-30T16:51:34Z',
    'owner': {
      'id': 'db468f10-ab68-48ee-9cae-1acad0e89da7'
    },
    'mode': refdata?.find(rdc => rdc?.desc === 'Correspondence.Mode')?.values?.find(rdv => rdv?.value === 'email'),
    'category': refdata?.find(rdc => rdc?.desc === 'Correspondence.Category')?.values?.find(rdv => rdv?.value === 'invoice'),
    'content': 'Test Description',
    'status': refdata?.find(rdc => rdc?.desc === 'Correspondence.Status')?.values?.find(rdv => rdv?.value === 'awaiting_reply')
  };

  const handlers = {
    onClose: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    onSubmit: jest.fn(),
};

export { correspondence, handlers };
