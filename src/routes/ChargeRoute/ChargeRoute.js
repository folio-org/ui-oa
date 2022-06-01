import { useParams, useHistory } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';

import { LoadingPane } from '@folio/stripes/components';

import ChargeView from '../../components/views/ChargeView';
import { PANE_DEFAULT_WIDTH } from '../../constants/config';
import urls from '../../util/urls';

const ChargeRoute = () => {
  const ky = useOkapiKy();
  const history = useHistory();

  const { prId, chId } = useParams();

  const {
    data: charge,
    isLoading,
    refetch: refetchCharge,
  } = useQuery(['ui-oa', 'ChargeRoute', 'getCharge', chId], () => ky(`oa/charges/${chId}`).json());

  const { data: request, refetch: refetchRequest } = useQuery(
    ['ui-oa', 'ChargeRoute', 'getPublicationRequest', prId],
    () => ky(`oa/publicationRequest/${prId}`).json()
  );

  const handleClose = () => {
    history.push(urls.publicationRequest(prId));
  };

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
    <ChargeView
      charge={charge}
      refetchCharge={refetchCharge}
      refetchRequest={refetchRequest}
      request={request}
    />
  );
};

export default ChargeRoute;
