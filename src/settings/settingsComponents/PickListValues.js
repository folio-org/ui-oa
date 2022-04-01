import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { Pane, Select } from '@folio/stripes/components';
import { EditableRefdataList } from '@k-int/stripes-kint-components';
import useOARefdata from '../../util/useOARefdata';
import { REFDATA_ENDPOINT } from '../../constants';

const PickListValues = () => {
 const rdcOptions = useOARefdata()?.map(rdv => ({ value: rdv.desc, label: rdv.desc }));
 const [selectedPickList, setSelectedPickList] = useState('');
 const history = useHistory();

  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="edit-refdata-requestStatus"
      onClose={() => history.push('/settings/oa')}
      paneTitle={<FormattedMessage id="ui-oa.settings.refdata.picklistValues" />}
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

export default PickListValues;
