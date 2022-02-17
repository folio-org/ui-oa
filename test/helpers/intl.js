/* eslint-disable react/prop-types */
import { IntlProvider } from 'react-intl';

import OATranslations from '../../translations/ui-oa/en';

const prefixKeys = (translations, prefix) => {
  return Object
    .keys(translations)
    .reduce((acc, key) => (
      {
        ...acc,
        [`${prefix}.${key}`]: translations[key],
      }
    ), {});
};

const translations = {
  ...prefixKeys(OATranslations, 'ui-oa'),
};

const Intl = ({ children }) => (
  <IntlProvider
    locale="en"
    messages={translations}
  >
    {children}
  </IntlProvider>
);

export default Intl;
