import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';

import urls from '../util/urls';
import CorrespondenceView from '../components/views/CorrespondenceView';

// TODO: handle delete functions correctly, but will need to refetch data
// to be able to return to PublicationRequest on delete

const CorrespondenceViewRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, cId } = useParams();

  const { data: correspondence } = useQuery(
    ['ui-oa', 'correspondenceViewRoute', 'correspondence', cId],
    () => ky(`oa/correspondence/${cId}`).json()
  );

  const { mutateAsync: deleteCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceViewRoute', 'deleteCorrespondence'],
    () => ky.delete(`oa/correspondence/${cId}`)
  );

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${prId}`);
  };

  const handleDelete = () => {
    deleteCorrespondence(cId).then(() => {
      history.push(`/oa/publicationRequests/${prId}`);
    });
  };

  const handleEdit = () => {
    history.push(`${urls.publicationRequestCorrespondenceEdit(prId, cId)}`);
  };

  return (
    <CorrespondenceView
      correspondence={correspondence}
      onClose={handleClose}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
};

export default CorrespondenceViewRoute;
