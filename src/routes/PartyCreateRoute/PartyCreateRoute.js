import { useContext } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy, CalloutContext } from '@folio/stripes/core';

import PartyForm from '../../components/views/PartyForm';
import getPartyErrorMessage from '../../util/getPartyErrorMessage';
import urls from '../../util/urls';
import { PARTIES_ENDPOINT } from '../../constants/endpoints';

const PartyCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);

  const handleClose = (id) => {
    if (id) {
      history.push(urls.party(id));
    } else {
      history.push(urls.parties());
    }
  };

  const { mutateAsync: postParty } = useMutation(
    ['ui-oa', 'PartyCreateRoute', 'postParty'],
    (data) => ky
        .post(PARTIES_ENDPOINT, { json: data })
        .json()
        .then((res) => {
          const createdParty =
            (res.title ? res.title + ' ' : '') +
            res?.givenNames +
            ' ' +
            res?.familyName;
          callout.sendCallout({
            message: (
              <FormattedMessage
                id="ui-oa.party.creationSuccessCallout"
                values={{ createdParty }}
              />
            ),
            type: 'success',
          });
          handleClose(res.id);
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

  const submitParty = async (values) => {
    await postParty(values);
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
