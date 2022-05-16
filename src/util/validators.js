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

const validateDateFormat = (value) => {
  const regex =
    /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$|^[0-9]{4}-(((0[123456789]|(10|11|12))))$|^[0-9]{4}$/;
  const match = regex.test(value);
  if (!value) {
    return undefined;
  } else {
    return value && !match ? (
      <FormattedMessage id="ui-oa.publicationRequest.publicationYear.validate" />
    ) : undefined;
  }
};
export {
  validateNotNegative,
  validateAsDecimal,
  validateNotLessThanZero,
  validateDateFormat,
};
