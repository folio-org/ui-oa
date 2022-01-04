import { useHistory, useParams } from 'react-router-dom';
import CorrespondenceView from '../components/views/CorrespondenceView';

const CorrespondenceViewRoute = () => {
  const history = useHistory();
  const { prId, cId } = useParams();

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${prId}`);
  };

  return (
    <CorrespondenceView
      handlers={{ onClose: handleClose }}
    />
  );
};

export default CorrespondenceViewRoute;
