import { useQueryClient } from 'react-query';
import noop from 'lodash/noop';
import { useMutateGeneric } from '@k-int/stripes-kint-components';

import { CHECKLIST_ITEM_DEFINITIONS_ENDPOINT } from '../constants/endpoints';

const useMutateChecklistItemDefinitions = ({
   afterQueryCalls: {
     delete: afterQueryDelete = noop,
     post: afterQueryPost = noop,
     put: afterQueryPut = noop,
   } = {},
  ...mutateGenericProps
}) => {
  const queryClient = useQueryClient();
  const invalidateChecklistItemDefinition = () => queryClient.invalidateQueries(['OA', 'ChecklistItemDefinitions']);

  return useMutateGeneric({
    afterQueryCalls: {
      delete: (res) => {
        invalidateChecklistItemDefinition()
          .then(() => {
            afterQueryDelete(res);
          });
      },
      post: (res) => {
        invalidateChecklistItemDefinition()
          .then(() => {
            afterQueryPost(res);
          });
      },
      put: (res) => {
        invalidateChecklistItemDefinition()
          .then(() => {
            afterQueryPut(res);
          });
      },
    },
    endpoint: CHECKLIST_ITEM_DEFINITIONS_ENDPOINT,
    queryKey: ['OA', 'ChecklistItemDefinitions'],
    ...mutateGenericProps
  });
};

export default useMutateChecklistItemDefinitions;
