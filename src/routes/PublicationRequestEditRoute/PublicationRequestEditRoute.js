import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery, useMutation } from 'react-query';
import PublicationRequestForm from '../../components/views/PublicationRequestForm';

import publicationRequestSubmitHandler from '../../util/publicationRequestSubmitHandler';
import useOARefdata from '../../util/useOARefdata';
import getRDVId from '../../util/getRDVId';

const [PUBLICATION_TYPE] = ['PublicationRequest.PublicationType'];

const PublicationRequestEditRoute = () => {
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
    history.push(`/oa/publicationRequests/${id}`);
  };

  const { data: publicationRequest, isLoading } = useQuery(
    ['ui-oa', 'publicationEditRoute', 'publicationRequest', id],
    () => ky(`oa/publicationRequest/${id}`).json()
  );

  const { mutateAsync: putPublicationRequest, isLoading: isSubmitting } =
    useMutation(
      ['ui-oa', 'PublicationRequestEditRoute', 'putPublicationRequest'],
      (data) => ky.put(`oa/publicationRequest/${data.id}`, { json: data }).then(() => {
          handleClose();
        })
    );

  const submitRequest = (values) => {
    const submitValues = publicationRequestSubmitHandler(
      values,
      journalArticleId
    );
    putPublicationRequest(submitValues);
  };

  return (
    <Form
      initialValues={publicationRequest}
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
            publicationRequest={publicationRequest}
            queryStates={{
              isSubmitting,
              isLoading,
            }}
          />
        </form>
      )}
    </Form>
  );
};

export default PublicationRequestEditRoute;
