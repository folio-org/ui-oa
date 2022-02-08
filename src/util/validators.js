import { FormattedMessage } from 'react-intl';

const validateNotNegative = (value) => {
  return !value || value > 0 ? undefined : (
    <FormattedMessage id="ui-oa.charge.validate.notNegative" />
  );
};

const validateAsDecimal = (value) => {
  const regexp = /(?!^0*$)(?!^0*\.0*$)^\d{1,10}(\.\d{1,10})?$/;
  return value && !regexp.test(value) ? (
    <FormattedMessage id="ui-oa.charge.validate.maxDigits" />
  ) : undefined;
};
export { validateNotNegative, validateAsDecimal };
