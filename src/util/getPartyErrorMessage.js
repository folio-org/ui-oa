import SafeHTMLMessage from '@folio/react-intl-safe-html';

const getPartyErrorMessage = (message) => {
  // Example: Party was not saved. OrcId must be unique. A Party with OrcId "1" already exists
  const identifier = message.split('.')[1].split(' ')[1];
  // identifier splits message into 3 and takes first word from middle section to use as identifier
  const duplicateElement = '"' + message.split('"')[1] + '"';
  // duplicateElement finds the element in the message nested within quotations to use as the callout values
  return (
    <SafeHTMLMessage
      id={`ui-oa.party.unique${identifier}Error`}
      values={{ duplicateElement }}
    />
  );
};

export default getPartyErrorMessage;
