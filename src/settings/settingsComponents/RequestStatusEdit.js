import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Pane } from '@folio/stripes/components';
import { EditableRefdataList } from '@k-int/stripes-kint-components';

const RequestStatusEdit = () => {
  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="edit-refdata-requestStatus"
      paneTitle={<FormattedMessage id="ui-oa.settings.refdata.requestStatus" />}
    >
      <EditableRefdataList
        desc="PublicationRequest.RequestStatus"
        refdataEndpoint="oa/refdata"
      />
    </Pane>
  );
};

export default RequestStatusEdit;
