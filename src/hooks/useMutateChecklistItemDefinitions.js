import { useMutation, useQueryClient } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { CHECKLIST_ITEM_DEFINITIONS_ENDPOINT } from '../constants/endpoints';

const useMutateChecklistItemDefinitions = ({
  afterQueryCalls,
  catchQueryCalls,
  queryParams,
  returnQueryObject = {
    post: false,
    put: false,
    delete: false
  }
}) => {
  const returnObj = {};
  const queryClient = useQueryClient();

  const ky = useOkapiKy();

  const invalidateChecklistItemDefinition = () => queryClient.invalidateQueries(['OA', 'ChecklistItemDefinitions']);

  const deleteQueryObject = useMutation(
    ['OA', 'ChecklistItemDefinitions', 'Delete'],
    async (id) => ky.delete(`${CHECKLIST_ITEM_DEFINITIONS_ENDPOINT}/${id}`).json()
      .then(afterQueryCalls?.delete)
      .then(() => invalidateChecklistItemDefinition())
      .catch(catchQueryCalls?.delete),
    queryParams?.delete
  );

  const putQueryObject = useMutation(
    ['OA', 'ChecklistItemDefinitions', 'Put'],
    async (data) => ky.put(`${CHECKLIST_ITEM_DEFINITIONS_ENDPOINT}/${data.id}`, { json: data }).json()
      .then(afterQueryCalls?.put)
      .then(() => invalidateChecklistItemDefinition())
      .catch(catchQueryCalls?.put),
    queryParams?.put
  );

  const postQueryObject = useMutation(
    ['OA', 'ChecklistItemDefinitions', 'Post'],
    async (data) => ky.post(`${CHECKLIST_ITEM_DEFINITIONS_ENDPOINT}`, { json: data }).json()
      .then(afterQueryCalls?.post)
      .then(() => invalidateChecklistItemDefinition())
      .catch(catchQueryCalls?.post),
    queryParams?.post
  );

  if (returnQueryObject?.delete) {
    returnObj.delete = deleteQueryObject;
  } else {
    returnObj.delete = deleteQueryObject.mutateAsync;
  }

  if (returnQueryObject?.put) {
    returnObj.put = putQueryObject;
  } else {
    returnObj.put = putQueryObject.mutateAsync;
  }

  if (returnQueryObject?.post) {
    returnObj.post = postQueryObject;
  } else {
    returnObj.post = postQueryObject.mutateAsync;
  }

  return returnObj;
};

export default useMutateChecklistItemDefinitions;
