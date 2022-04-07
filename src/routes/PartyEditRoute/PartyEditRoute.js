import { useContext } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy, CalloutContext } from '@folio/stripes/core';

import PartyForm from '../../components/views/PartyForm';
import getPartyErrorMessage from '../../util/getPartyErrorMessage';


const PartyEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);
  const { id } = useParams();

  const handleClose = () => {
    history.push(`/oa/people/${id}`);
  };

  const { data: party, isLoading } = useQuery(
    ['ui-oa', 'PartyEditRoute', 'party', id],
    () => ky(`oa/party/${id}`).json()
  );

  const { mutateAsync: putParty } = useMutation(
    ['ui-oa', 'PartyEditRoute', 'putParty'],
    (data) => ky.put(`oa/party/${data.id}`, { json: data }).json().then((res) => {
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

  const submitRequest = (values) => {
    putParty(values);
  };

  return (
    <Form
      initialValues={party}
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
            isLoading={isLoading}
            party={party}
          />
        </form>
      )}
    </Form>
  );
};

export default PartyEditRoute;
