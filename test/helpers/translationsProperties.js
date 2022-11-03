import { translationsProperties as coreTranslations } from '@folio/stripes-erm-testing';

import translations from '../../translations/ui-oa/en';

const translationsProperties = [
  {
    prefix: 'ui-oa',
    translations,
  },
  ...coreTranslations
];

export default translationsProperties;
