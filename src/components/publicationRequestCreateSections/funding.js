import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion } from '@folio/stripes/components';

import FundingFieldArray from './fieldArrays/fundingFieldArray';

const Funding = () => {
  return (
    <Accordion label={<FormattedMessage id="ui-oa.publicationRequest.funding" />}>
      <FundingFieldArray />
    </Accordion>
  );
};

export default Funding;
