const party = {
  'id': '2353b398-ceb1-460e-94b9-47f4a95c06b9',
  'title': 'Dr',
  'mainEmail': 'Elijah_Dempsey6074@brety.org',
  'fullName': 'Elijah Dempsey',
  'givenNames': 'Elijah',
  'familyName': 'Dempsey',
  'orcidId': '0000-1111',
  'phone': '012345678',
  'mobile': '012345678'
};

const party2 = {
  id: '7fc31e67-ee19-49ce-881b-de45935db7f4',
  title: 'Dr',
  mainEmail: 'Doug_Middleton2628@bulaffy.com',
  fullName: 'Doug Middleton',
  givenNames: 'Doug',
  familyName: 'Middleton',
};

const handlers = {
  onClose: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  onSubmit: jest.fn(),
};

export { party, party2, handlers };
