import { useContext } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { LoadingView } from '@folio/stripes/components';
import { useOkapiKy, CalloutContext } from '@folio/stripes/core';

import PartyForm from '../../components/views/PartyForm';
import getPartyErrorMessage from '../../util/getPartyErrorMessage';
import urls from '../../util/urls';
import { PARTY_ENDPOINT } from '../../constants/endpoints';

const PartyEditRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const callout = useContext(CalloutContext);
  const { id } = useParams();

  const handleClose = () => {
    history.push(`${urls.party(id)}${location.search}`);
  };

  const {
    data: party,
    isLoading,
  } = useQuery([id], () => ky(PARTY_ENDPOINT(id)).json());

  const { mutateAsync: putParty } = useMutation(
    ['ui-oa', 'PartyEditRoute', 'putParty'],
    (data) => ky
        .put(PARTY_ENDPOINT(data.id), { json: data })
        .json()
        .then((res) => {
          const updatedParty =
            (res.title ? res.title + ' ' : '') +
            res?.givenNames +
            ' ' +
            res?.familyName;
          callout.sendCallout({
            message: (
              <FormattedMessage
                id="ui-oa.party.updatedSuccessCallout"
                values={{ updatedParty }}
              />
            ),
            type: 'success',
          });
          queryClient.invalidateQueries(id);
          handleClose();
        })
        .catch((err) => {
          err.response.json().then((text) => {
            if (text.total) {
              // If there are multiple errors, map the errors onto seperate callouts.
              text._embedded.errors.map((error) => callout.sendCallout({
                  message: getPartyErrorMessage(error?.message),
                  type: 'error',
                }));
            } else {
              callout.sendCallout({
                message: getPartyErrorMessage(text?.message),
                type: 'error',
              });
            }
          });
        })
  );

  const submitRequest = async (values) => {
    await putParty(values);
  };

  if (isLoading) {
    return <LoadingView dismissible onClose={handleClose} />;
  }

  return (
    <Form
      initialValues={party}
      keepDirtyOnReinitialize
      mutators={arrayMutators}
      onSubmit={submitRequest}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <PartyForm
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
            party={party}
          />
        </form>
      )}
    </Form>
  );
};

export default PartyEditRoute;
