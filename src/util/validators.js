import { FormattedMessage } from 'react-intl';

const validateNotNegative = (value) => {
  return !value || value > 0 ? undefined : (
    <FormattedMessage id="ui-oa.charge.validate.notNegative" />
  );
};

const validateAsDecimal = (value) => {
  const regexp = /(?!^0*$)(?!^0*\.0*$)^\d{1,10}(\.\d{1,10})?$/;
  if (value === '0') {
    return undefined;
  } else {
    return value && !regexp.test(value) && value !== 0 ? (
      <FormattedMessage id="ui-oa.charge.validate.maxDigits" />
    ) : undefined;
  }
};

const validateNotLessThanZero = (value) => {
  return !value || value >= 0 ? undefined : (
    <FormattedMessage id="ui-oa.charge.validate.notLessThanZero" />
  );
};
export { validateNotNegative, validateAsDecimal, validateNotLessThanZero };
