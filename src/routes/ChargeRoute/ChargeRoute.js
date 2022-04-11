import { useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';

import { LoadingPane } from '@folio/stripes/components';

import ChargeView from '../../components/views/ChargeView';
import { PANE_DEFAULT_WIDTH } from '../../constants/config';

const ChargeRoute = () => {
  const ky = useOkapiKy();

  const { prId, chId } = useParams();

  const { data: publicationRequest, isLoading, refetch } = useQuery(
    ['ui-oa', 'publicationEditRoute', 'publicationRequest', prId],
    () => ky(`oa/publicationRequest/${prId}`).json()
  );

  if (isLoading) {
    return (
      <LoadingPane
        defaultWidth={PANE_DEFAULT_WIDTH}
        dismissable
      />
    );
  }

  const charge = publicationRequest?.charges?.find(pr => pr?.id === chId);

  return (
    <ChargeView
      charge={charge}
      refetch={refetch}
      request={publicationRequest}
    />
  );
};

export default ChargeRoute;
