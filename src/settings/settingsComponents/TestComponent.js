import React from 'react';

import { Pane } from '@folio/stripes/components';
import { EditableRefdataList } from '@k-int/stripes-kint-components';

const TestComponent = () => {
  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="Testing"
      paneTitle="TESTING"
    >
      <EditableRefdataList
        desc="PublicationRequest.RequestStatus"
        refdataEndpoint="oa/refdata"
      />
    </Pane>
  );
};

export default TestComponent;
