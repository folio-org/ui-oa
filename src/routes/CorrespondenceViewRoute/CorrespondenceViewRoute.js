import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';

import { checkScope, HasCommand, LoadingPane } from '@folio/stripes/components';
import urls from '../../util/urls';
import CorrespondenceView from '../../components/views/CorrespondenceView';
import { CORRESPONDENCE_ENDPOINT } from '../../constants/endpoints';
import { PANE_DEFAULT_WIDTH } from '../../constants/config';

const CorrespondenceViewRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { prId, cId } = useParams();

  const { data: correspondence, isLoading } = useQuery([cId], () => ky(CORRESPONDENCE_ENDPOINT(cId)).json());

  const { mutateAsync: deleteCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceViewRoute', 'deleteCorrespondence'],
    () => ky.delete(CORRESPONDENCE_ENDPOINT(cId))
  );

  const handleClose = () => {
    history.push(`${urls.publicationRequest(prId)}${location.search}`);
  };

  const handleDelete = async () => {
    await deleteCorrespondence(cId);
    history.push(`${urls.publicationRequest(prId)}${location.search}`);
  };

  const handleEdit = () => {
    history.push(
      `${urls.publicationRequestCorrespondenceEdit(prId, cId)}${
        location.search
      }`
    );
  };

  const shortcuts = [
    {
      name: 'edit',
      handler: () => handleEdit(),
    },
  ];

  if (isLoading) {
    return (
      <LoadingPane
        defaultWidth={PANE_DEFAULT_WIDTH}
        dismissible
        onClose={handleClose}
      />
    );
  }

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
