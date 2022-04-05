import { useContext } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';

import { useOkapiKy, CalloutContext } from '@folio/stripes/core';

import PartyForm from '../../components/views/PartyForm';
import getPartyErrorMessage from '../../util/getPartyErrorMessage';

const PartyCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);

  const handleClose = (id) => {
    history.push(`/oa/people/${id}`);
  };

  const { mutateAsync: postParty } = useMutation(
    ['ui-oa', 'PartyCreateRoute', 'postParty'],
    (data) => ky
        .post('oa/party', { json: data })
        .json()
        .then((res) => {
          handleClose(res.id);
        })
        .catch((err) => {
          err.response.json().then((text) => {
            if (text.total) {
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

  const submitParty = (values) => {
    postParty(values);
  };

  return (
    <Form mutators={arrayMutators} onSubmit={submitParty}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <PartyForm
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
          />
        </form>
      )}
    </Form>
  );
};

export default PartyCreateRoute;
