import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { LoadingView } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';

import CorrespondenceForm from '../../components/views/CorrespondenceForm';

import urls from '../../util/urls';
import { CORRESPONDENCE_ENDPOINT } from '../../constants/endpoints';

const CorrespondenceEditRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const { prId, cId } = useParams();

  const handleClose = () => {
    history.push(
      `${urls.publicationRequestCorrespondenceView(prId, cId)}${
        location.search
      }`
    );
  };

  const { data: correspondence, isLoading } = useQuery([cId], () => ky(CORRESPONDENCE_ENDPOINT(cId)).json());

  const { mutateAsync: putCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceEditRoute', 'putCorrespondence'],
    (data) => {
      ky.put(CORRESPONDENCE_ENDPOINT(cId), { json: data }).then(() => {
        queryClient.invalidateQueries(cId);
        handleClose();
      });
    }
  );
  const submitCorrespondence = async (values) => {
    const { category, ...submitValues } = { ...values };
    if (category?.id) {
      submitValues.category = category;
    } else {
      submitValues.category = null;
    }
    await putCorrespondence(submitValues);
  };

  if (isLoading) {
    return <LoadingView dismissible onClose={handleClose} />;
  }

  return (
    <Form
      initialValues={correspondence}
      keepDirtyOnReinitialize
      mutators={arrayMutators}
      onSubmit={submitCorrespondence}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CorrespondenceForm
            correspondence={correspondence}
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

export default CorrespondenceEditRoute;
