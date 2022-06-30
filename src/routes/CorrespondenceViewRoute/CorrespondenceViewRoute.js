import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';

import { checkScope, HasCommand } from '@folio/stripes/components';
import urls from '../../util/urls';
import CorrespondenceView from '../../components/views/CorrespondenceView';

const CorrespondenceViewRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, cId } = useParams();

  const { data: correspondence, isLoading } = useQuery(
    ['ui-oa', 'correspondenceViewRoute', 'correspondence', cId],
    () => ky(`oa/correspondence/${cId}`).json()
  );

  const { mutateAsync: deleteCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceViewRoute', 'deleteCorrespondence'],
    () => ky.delete(`oa/correspondence/${cId}`)
  );

  const handleClose = () => {
    history.push(urls.publicationRequest(prId));
  };

  const handleDelete = async () => {
    await deleteCorrespondence(cId);
    history.push(urls.publicationRequest(prId));
  };

  const handleEdit = () => {
    history.push(`${urls.publicationRequestCorrespondenceEdit(prId, cId)}`);
  };

  const shortcuts = [
    {
      name: 'edit',
      handler: () => handleEdit(),
    },
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <CorrespondenceView
        correspondence={correspondence}
        isLoading={isLoading}
        onClose={handleClose}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </HasCommand>
  );
};

export default CorrespondenceViewRoute;
