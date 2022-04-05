import SafeHTMLMessage from '@folio/react-intl-safe-html';

const getPartyErrorMessage = (message) => {
  const identifier = message.split('.')[1].split(' ')[1];
  const duplicateElement = '"' + message.split('"')[1] + '"';
  return (
    <SafeHTMLMessage
      id={`ui-oa.party.unique${identifier}Error`}
      values={{ duplicateElement }}
    />
  );
};

export default getPartyErrorMessage;
