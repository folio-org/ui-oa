import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';

import CorrespondenceView from '../components/views/CorrespondenceView';

const CorrespondenceViewRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, cId } = useParams();

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${prId}`);
  };

  const { data: correspondence } = useQuery(
    ['ui-oa', 'correspondenceViewRoute', 'correspondence', cId],
    () => ky(`oa/correspondence/${cId}`).json()
  );

  return (
    <CorrespondenceView
      correspondence={correspondence}
      handlers={{ onClose: handleClose }}
    />
  );
};

export default CorrespondenceViewRoute;
