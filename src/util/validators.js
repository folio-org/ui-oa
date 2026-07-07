import { FormattedMessage } from 'react-intl';
import isDecimal from 'validator/lib/isDecimal';
import { getEstimatedInvoicePrice } from './chargeUtils';

const validateNotNegative = (value) => {
  return !value || value > 0 ? undefined : (
    <FormattedMessage id="ui-oa.charge.validate.notNegative" />
  );
};

const validateAsDecimal = (value) => {
  if (!value && value !== 0) {
    return undefined;
  }
  const stringValue = String(value);
  const regex = /^\d{1,10}(\.\d{0,10})?$/;
  if (isDecimal(stringValue, { decimal_digits: '0,10' }) && regex.test(stringValue)) {
    return undefined;
  }
  return <FormattedMessage id="ui-oa.charge.validate.maxDigits" />;
};

const validateAsCurrency = (value) => {
  if (!value && value !== 0) {
    return undefined;
  }
  const stringValue = String(value);
  const regex = /^\d{1,10}(\.\d{0,10})?$/;
  if (isDecimal(stringValue, { decimal_digits: '0,10' }) && regex.test(stringValue)) {
    return undefined;
  }
  return <FormattedMessage id="ui-oa.charge.validate.maxDigits" />;
};

const validateNotLessThanZero = (value) => {
  return !value || value >= 0 ? undefined : (
    <FormattedMessage id="ui-oa.charge.validate.notLessThanZero" />
  );
};

const validateDateFormat = (value) => {
  const regexp =
    /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$|^[0-9]{4}-(((0[123456789]|(10|11|12))))$|^[0-9]{4}$/;
  const match = regexp.test(value);
  if (!value) {
    return undefined;
  } else {
    return value && !match ? (
      <FormattedMessage id="ui-oa.publicationRequest.publicationYear.validate" />
    ) : undefined;
  }
};

const validateURL = (value) => {
  const regexp =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  if (!value) {
    return undefined;
  } else {
    return value && !regexp.test(value) ? (
      <FormattedMessage id="ui-oa.publicationRequest.validate.publicationURL" />
    ) : undefined;
  }
};

const validateMoreThanTotal = (values, allValues) => {
  if (
    getEstimatedInvoicePrice(allValues) -
      values?.reduce((a, b) => {
        return a + (Number(b.payerAmount) || 0);
      }, 0) <
    0
  ) {
    return (
      <FormattedMessage id="ui-oa.charge.payers.amountsMoreThanChargeTotal" />
    );
  }
  return undefined;
};

const validateYear = (value) => {
  const regexp = /^([0-9]{4})?$/;
  if (!value) {
    return undefined;
  } else {
    return value && !regexp.test(value) ? (
      <FormattedMessage id="ui-oa.charge.validate.fourDigits" />
    ) : undefined;
  }
};

const validateNoSpecialCharacters = (value) => {
  const regexp = /^[A-Za-z0-9 ]*$/;
  if (!value) {
    return undefined;
  } else {
    return value && !regexp.test(value) ? (
      <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.validateNoSpecial" />
      ) : undefined;
  }
};

export {
  validateNotNegative,
  validateAsDecimal,
  validateAsCurrency,
  validateNotLessThanZero,
  validateDateFormat,
  validateURL,
  validateMoreThanTotal,
  validateYear,
  validateNoSpecialCharacters
};
