import { useContext } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import createDecorator from 'final-form-focus';

import { useHistory, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy, CalloutContext } from '@folio/stripes/core';
import { useGenerateNumber } from '@folio/service-interaction';

import PublicationRequestForm from '../../components/views/PublicationRequestForm';
import publicationRequestSubmitHandler from '../../util/publicationRequestSubmitHandler';
import { useOARefdata } from '../../util';
import getRDVId from '../../util/getRDVId';
import { PUBLICATION_REQUESTS_ENDPOINT } from '../../constants/endpoints';
import urls from '../../util/urls';

const [PUBLICATION_TYPE] = ['PublicationRequest.PublicationType'];

const PublicationRequestCreateRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);
  const focusOnError = createDecorator();
  const refdataValues = useOARefdata([PUBLICATION_TYPE]);
  const journalArticleId = getRDVId(
    refdataValues,
    PUBLICATION_TYPE,
    'journal_article'
  );

  const { generate } = useGenerateNumber({
    callback: (string) => {
      return string;
    },
    generator: 'openAccess',
    sequence: 'requestSequence',
  });

  const handleClose = (prId) => {
    if (prId) {
      history.push(`${urls.publicationRequest(prId)}${location.search}`);
    } else {
      history.push(`${urls.publicationRequest()}${location.search}`);
    }
  };

  const { mutateAsync: postPublicationRequest } = useMutation(
    ['ui-oa', 'PublicationRequestCreateRoute', 'postPublicationRequest'],
    (data) => ky
        .post(PUBLICATION_REQUESTS_ENDPOINT, { json: data })
        .json()
        .then((res) => {
          const requestNumber = res.requestNumber;
          callout.sendCallout({
            message: (
              <FormattedMessage
                id="ui-oa.publicationRequest.success.callout"
                values={{ requestNumber }}
              />
            ),
          });
          handleClose(res.id);
        })
  );

  const submitRequest = async (values) => {
    const generatedString = await generate();
    const submitValues = publicationRequestSubmitHandler(
      {
        ...values,
        requestNumber: generatedString?.data,
      },
      journalArticleId
    );
    await postPublicationRequest(submitValues);
  };

  return (
    <>
      <Form
        decorators={[focusOnError]}
        mutators={arrayMutators}
        onSubmit={submitRequest}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <PublicationRequestForm
              handlers={{
                onClose: handleClose,
                onSubmit: handleSubmit,
              }}
            />
          </form>
        )}
      </Form>
    </>
  );
};

export default PublicationRequestCreateRoute;
