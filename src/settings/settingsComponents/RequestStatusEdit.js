import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Pane, Select } from '@folio/stripes/components';
import { EditableRefdataList } from '@k-int/stripes-kint-components';
import useOARefdata from '../../util/useOARefdata';
import { REFDATA_ENDPOINT } from '../../constants';

const RequestStatusEdit = () => {
 const rdcOptions = useOARefdata()?.map(rdv => ({ value: rdv.desc, label: rdv.desc }));
 const [selectedPickList, setSelectedPickList] = useState('');

  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="edit-refdata-requestStatus"
      paneTitle={<FormattedMessage id="ui-oa.settings.refdata.requestStatus" />}
    >
      <Select
        dataOptions={[{ value: '', label: '' }, ...rdcOptions]}
        onChange={e => setSelectedPickList(e.target.value)}
        value={selectedPickList}
      />
      {selectedPickList &&
        <EditableRefdataList
          desc={selectedPickList}
          refdataEndpoint={REFDATA_ENDPOINT}
        />
      }
    </Pane>
  );
};

export default RequestStatusEdit;
