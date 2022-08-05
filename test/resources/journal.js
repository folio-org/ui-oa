import refdata from './refdata';

const journal = {
  id: '155823db-2ae0-4293-9a11-442efd7b828e',
  title: 'Annals of Global Analysis and Geometry',
  instances: [
    {
      id: 'c0920b19-9523-4ec9-9fe2-5a4b6421e3cc',
      subType: refdata?.find(rdc => rdc.desc === 'TitleInstance.SubType')?.values?.find(rdv => rdv?.value === 'print'),
      title: 'Annals of Global Analysis and Geometry',
      type: refdata?.find(rdc => rdc.desc === 'TitleInstance.Type')?.values?.find(rdv => rdv?.value === 'serial'),
      publicationType: refdata?.find(rdc => rdc.desc === 'TitleInstance.PublicationType')?.values?.find(rdv => rdv?.value === 'journal'),
      identifiers: [
        {
          title: {
            id: 'c0920b19-9523-4ec9-9fe2-5a4b6421e3cc',
          },
          selected: true,
          identifier: {
            value: '1572-9060',
            ns: {
              value: 'issn',
            },
          },
        },
      ],
      work: {
        id: '155823db-2ae0-4293-9a11-442efd7b828e',
      },
    },
    {
      id: 'a381fcfb-ce92-429a-9faf-1ec67faad54e',
      subType: refdata?.find(rdc => rdc.desc === 'TitleInstance.SubType')?.values?.find(rdv => rdv?.value === 'electronic'),
      title: 'Annals of Global Analysis and Geometry',
      type: refdata?.find(rdc => rdc.desc === 'TitleInstance.Type')?.values?.find(rdv => rdv?.value === 'serial'),
      publicationType: refdata?.find(rdc => rdc.desc === 'TitleInstance.PublicationType')?.values?.find(rdv => rdv?.value === 'journal'),
      identifiers: [
        {
          title: {
            id: 'a381fcfb-ce92-429a-9faf-1ec67faad54e',
          },
          selected: true,
          identifier: {
            value: '0232-704X',
            ns: {
              value: 'issn',
            },
          },
        },
      ],
      work: {
        id: '155823db-2ae0-4293-9a11-442efd7b828e',
      },
    },
  ],
};

const handlers = {
  onClose: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  onSubmit: jest.fn(),
};

export { journal, handlers };
