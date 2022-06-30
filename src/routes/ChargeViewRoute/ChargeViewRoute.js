import { useParams, useHistory } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';

import { LoadingPane } from '@folio/stripes/components';

import ChargeView from '../../components/views/ChargeView';
import { PANE_DEFAULT_WIDTH } from '../../constants/config';
import urls from '../../util/urls';
import useOARefdata from '../../util/useOARefdata';

const ChargeViewRoute = () => {
  const ky = useOkapiKy();
  const history = useHistory();

  const { prId, chId } = useParams();

  const expectedStatusRefData = useOARefdata('Charge.ChargeStatus').find(
    (e) => e.value === 'expected'
  );

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

  const handleEdit = () => {
    history.push(urls.publicationRequestChargeEdit(prId, chId));
  };

  const handleLink = () => {
    history.push(`${urls.publicationRequestChargeLinkInvoice(prId, chId)}`);
  };

  const { mutateAsync: deleteCharge } = useMutation(
    ['ui-oa', 'ChargeView', 'deleteCharge'],
    () => {
      ky.delete(`oa/charges/${chId}`);
    }
  );

  const { mutateAsync: unlinkInvoice } = useMutation(
    ['ui-oa', 'ChargeView', 'unlinkInvoice'],
    (data) => {
      ky.put(`oa/charges/${chId}`, { json: data }).then(() => {
        refetchCharge();
      });
    }
  );

  const handleUnlink = () => {
    const submitValues = {
      ...charge,
      invoiceReference: null,
      invoiceLineItemReference: null,
      chargeStatus: expectedStatusRefData,
    };
    unlinkInvoice(submitValues);
  };

  const handleDelete = async () => {
    await deleteCharge(chId);
    await refetchRequest();
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
      handlers={{
        handleClose,
        handleEdit,
        handleLink,
        handleUnlink,
        handleDelete,
      }}
      request={request}
    />
  );
};

export default ChargeViewRoute;
