import React, { useEffect, useState } from 'react';

import { useMutation, useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { EditableList } from '@folio/stripes/smart-components';
const EditableRefdataList = () => {
  /* A component that allows for editing of refdata values */

  /*
    This should be useRefdata with option returnQueryObject set to true,
    available from 1.1.0

    (v1.0.x only returns the data)
  */
  const ky = useOkapiKy();
  const { data: { 0: refdata } = {}, isLoading: isRefdataLoading } = useQuery(
    ['stripes-kint-components', 'editableRefdataList', 'getRefdata'],
    () => ky('erm/refdata?filters=desc=SubscriptionAgreement.ReasonForClosure').json()
  );
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    if (!isRefdataLoading) {
      setContentData(refdata?.values ?? []);
    }
  }, [isRefdataLoading, refdata]);

  const { mutateAsync: createRefdataValue } = useMutation(
    ['stripes-kint-components', 'editableRefdataList', 'createValue', refdata],
    async (data) => ky.put(
      `erm/refdata/${refdata.id}`,
      {
        json: {
          ...refdata,
          values: [
            ...refdata.values,
            data
          ]
        }
      }
    )
      .then(res => res.json())
      .then(json => setContentData(json?.values ?? [])),
    {
      enabled: !!refdata
    }
  );


  const { mutateAsync: deleteRefdataValue } = useMutation(
    ['stripes-kint-components', 'editableRefdataList', 'createValue', refdata],
    async (data) => ky.put(
      `erm/refdata/${refdata.id}`,
      {
        json: {
          ...refdata,
          values: [
            {
              id: data,
              _delete: true
            }
          ]
        }
      }
    )
      .then(res => res.json())
      .then(json => setContentData(json?.values ?? [])),
    {
      enabled: !!refdata
    }
  );

  if (isRefdataLoading) {
    return 'loading';
  }

  console.log("ContentData: %o", contentData)

  /* This needs replacing with a less shit one */
  return (
    <EditableList
      columnMapping={{}}
      contentData={contentData}
      onCreate={createRefdataValue}
      onDelete={deleteRefdataValue}
      visibleFields={['label', 'value']}
    />
  );
};

export default EditableRefdataList;
