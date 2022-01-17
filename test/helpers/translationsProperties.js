import translations from '../../translations/ui-oa/en';

const translationsProperties = [
    {
      prefix: 'ui-oa',
      translations,
    },
    {
      prefix: 'stripes-core',
      translations: {
        'label.missingRequiredField': 'Please fill this in to continue',
        'button.save': 'Save',
      }
    },
    {
      prefix: 'stripes-components',
      translations: {
        'saveAndClose': 'Save and close',
        'cancel': 'Cancel',
        'paneMenuActionsToggleLabel': 'Actions',
        'collapseAll': 'Collapse all',
        'button.edit': 'Edit'
      },
    }
  ];

export default translationsProperties;
