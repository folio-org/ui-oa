import { useHistory, useParams } from 'react-router-dom';

import urls from '../../util/urls';
import ChargeView from '../../components/views/ChargeView';

const ChargeViewRoute = () => {
  const history = useHistory();
  const { prId } = useParams();

  const handleClose = () => {
    history.push(`${urls.publicationRequest(prId)}`);
  };

  return (
    <ChargeView
      charge={{}}
      onClose={handleClose}
    />
  );
};

export default ChargeViewRoute;
