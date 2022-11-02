import translations from '../../translations/ui-oa/en';
import { translationsProperties as coreTranslations } from '@folio/stripes-erm-testing';

const translationsProperties = [
  {
    prefix: 'ui-oa',
    translations,
  },
  ...coreTranslations
];

export default translationsProperties;
