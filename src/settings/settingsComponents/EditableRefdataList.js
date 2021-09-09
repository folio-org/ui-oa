import React, { useEffect, useState } from 'react';

import { useMutation, useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
//import { EditableList } from '@folio/stripes/smart-components';

import ActionList from './ActionList';

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
    () => ky('oa/refdata?filters=desc=PublicationRequest.RequestStatus&sort=value;asc').json()
  );
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    if (!isRefdataLoading) {
      setContentData(refdata?.values ?? []);
    }
  }, [isRefdataLoading, refdata]);

  const { mutateAsync: deleteRefdataValue } = useMutation(
    ['stripes-kint-components', 'editableRefdataList', 'createValue', refdata],
    async (data) => ky.put(
      `oa/refdata/${refdata.id}`,
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

  // In this case both EDIT and CREATE use the same call
  const { mutateAsync: editRefdataValue } = useMutation(
    ['stripes-kint-components', 'editableRefdataList', 'editValue', refdata],
    async (data) => ky.put(
      `oa/refdata/${refdata.id}`,
      {
        json: {
          ...refdata,
          values: [
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

  if (isRefdataLoading) {
    return 'loading';
  }

  // This is the function which will take a row in the table and assign the relevant actions to it
  // TODO make these 'labels' into ARIA labels
  const actionAssigner = () => {
    const actionArray = [
      { name: 'edit', icon: 'edit' },
    ];

    if (!refdata.internal) {
      actionArray.push({ name: 'delete', label: "DELETE", icon: 'trash' });
    }
    return actionArray;
  };

  return (
    <ActionList
      actionAssigner={actionAssigner}
      actionCalls={{
        create: refdata.internal ? null : (data) => editRefdataValue(data),
        edit: (data) => editRefdataValue(data),
        delete: (data) => deleteRefdataValue(data.id)
      }}
      contentData={contentData}
      editableFields={{
        value: () => !refdata.internal,
      }}
      visibleFields={['label', 'value']}
    />
  );
};

export default EditableRefdataList;
