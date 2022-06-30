import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import createDecorator from 'final-form-focus';

import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';
import { orderBy } from 'lodash';
import PublicationRequestForm from '../../components/views/PublicationRequestForm';

import publicationRequestSubmitHandler from '../../util/publicationRequestSubmitHandler';
import useOARefdata from '../../util/useOARefdata';
import getRDVId from '../../util/getRDVId';
import urls from '../../util/urls';
import { PUBLICATION_REQUEST_ENDPOINT } from '../../constants/endpoints';

const [PUBLICATION_TYPE] = ['PublicationRequest.PublicationType'];

const PublicationRequestEditRoute = () => {
  const focusOnError = createDecorator();
  const history = useHistory();
  const ky = useOkapiKy();
  const { id } = useParams();

  const refdataValues = useOARefdata([PUBLICATION_TYPE]);

  const journalArticleId = getRDVId(
    refdataValues,
    PUBLICATION_TYPE,
    'journal_article'
  );

  const handleClose = () => {
    history.push(urls.publicationRequest(id));
  };

  const { data: publicationRequest, isFetching } = useQuery(
    ['ui-oa', 'publicationEditRoute', 'publicationRequest', id],
    () => ky(PUBLICATION_REQUEST_ENDPOINT(id)).json()
  );

  const { mutateAsync: putPublicationRequest } = useMutation(
    ['ui-oa', 'PublicationRequestEditRoute', 'putPublicationRequest'],
    (data) => {
      ky.put(PUBLICATION_REQUEST_ENDPOINT(data.id), { json: data }).then(() => {
        handleClose();
      });
    }
  );

  const submitRequest = async (values) => {
    const submitValues = publicationRequestSubmitHandler(
      values,
      journalArticleId
    );
    await putPublicationRequest(submitValues);
  };

  const getInitialValues = () => {
    return {
      ...publicationRequest,
      externalRequestIds: orderBy(
        publicationRequest?.externalRequestIds,
        'externalId'
      ),
      identifiers: orderBy(publicationRequest?.identifiers, 'type.value'),
      publicationStatuses: orderBy(
        publicationRequest?.publicationStatuses,
        'statusDate'
      ),
      fundings: orderBy(publicationRequest?.fundings, 'funder.value'),
    };
  };

  return (
    <Form
      decorators={[focusOnError]}
      initialValues={getInitialValues()}
      keepDirtyOnReinitialize
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
            isFetching={isFetching}
            publicationRequest={publicationRequest}
          />
        </form>
      )}
    </Form>
  );
};

export default PublicationRequestEditRoute;
