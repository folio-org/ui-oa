import { React } from 'react';
import { Form } from 'react-final-form';

import { Button, MultiColumnList } from '@folio/stripes/components';


const EditableList = ({
  contentData,
  visibleFields
}) => {
  const contentDataWithActions = contentData?.map(cd => ({ ...cd, actions: ['edit', 'delete'] }));
  console.log("contentDataWithActions: %o", contentDataWithActions)
  return (
    <MultiColumnList
      contentData={contentDataWithActions}
      formatter={{
        actions: cd => <div>{cd.actions?.map(action => <Button>{action}</Button>)}</div>
      }}
      interactive={false}
      visibleColumns={[...visibleFields, 'actions']}
    />
  );
};

export default EditableList;
