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
      'noValue.noValueSet': 'No value set-',
      'collapseAll': 'Collapse all',
      'button.edit': 'Edit',
      'tableEmpty': 'The list contains no items',
      'metaSection.recordCreated': 'Record created: {date} {time}',
      'metaSection.recordCreatedNoData': 'Record created: Unknown',
      'metaSection.recordLastUpdated': 'Record last updated: {date} {time}',
      'metaSection.recordLastUpdatedNoData': 'Record last updated: Unknown',
    },
  }
];

export default translationsProperties;
