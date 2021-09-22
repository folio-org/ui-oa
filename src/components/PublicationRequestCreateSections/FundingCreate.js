import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion } from '@folio/stripes/components';

import FundingFieldArray from './FieldArrays/FundingFieldArray';

const FundingCreate = () => {
  return (
    <Accordion label={<FormattedMessage id="ui-oa.publicationRequest.funding" />}>
      <FundingFieldArray />
    </Accordion>
  );
};

export default FundingCreate;
