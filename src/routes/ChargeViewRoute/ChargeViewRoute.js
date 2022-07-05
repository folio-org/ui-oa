import { useParams, useHistory } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { LoadingPane } from '@folio/stripes/components';

import ChargeView from '../../components/views/ChargeView';
import { PANE_DEFAULT_WIDTH } from '../../constants/config';
import urls from '../../util/urls';
import useOARefdata from '../../util/useOARefdata';
import {
  PUBLICATION_REQUEST_ENDPOINT,
  CHARGE_ENDPOINT,
} from '../../constants/endpoints';

const ChargeViewRoute = () => {
  const ky = useOkapiKy();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { prId, chId } = useParams();

  const expectedStatusRefData = useOARefdata('Charge.ChargeStatus').find(
    (e) => e.value === 'expected'
  );

  const { data: charge, isLoading } = useQuery([chId], () => ky(CHARGE_ENDPOINT(chId)).json());

  const { data: request } = useQuery([prId], () => ky(PUBLICATION_REQUEST_ENDPOINT(prId)).json());

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
      ky.delete(CHARGE_ENDPOINT(chId));
    }
  );

  const { mutateAsync: unlinkInvoice } = useMutation(
    ['ui-oa', 'ChargeView', 'unlinkInvoice'],
    (data) => {
      ky.put(CHARGE_ENDPOINT(chId), { json: data }).then(() => {
        queryClient.invalidateQueries(chId);
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
    queryClient.invalidateQueries(prId);
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
