import { useContext } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import createDecorator from 'final-form-focus';

import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy, CalloutContext } from '@folio/stripes/core';
import { useGenerateNumber } from '@folio/service-interaction';

import PublicationRequestForm from '../../components/views/PublicationRequestForm';
import publicationRequestSubmitHandler from '../../util/publicationRequestSubmitHandler';
import useOARefdata from '../../util/useOARefdata';
import getRDVId from '../../util/getRDVId';

const [PUBLICATION_TYPE] = ['PublicationRequest.PublicationType'];

const PublicationRequestCreateRoute = () => {
  const history = useHistory();
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

  const handleClose = (id) => {
    let path = '/oa/publicationRequests';
    if (id) path += `/${id}`;
    history.push(path);
  };

  const { mutateAsync: postPublicationRequest } = useMutation(
    ['ui-oa', 'PublicationRequestCreateRoute', 'postPublicationRequest'],
    (data) => ky
        .post('oa/publicationRequest', { json: data })
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
        onSubmit={(values) => {
          generate().then((res) => submitRequest(values, res.data));
        }}
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
