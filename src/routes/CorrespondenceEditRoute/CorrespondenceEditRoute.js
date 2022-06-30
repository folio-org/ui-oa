import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import CorrespondenceForm from '../../components/views/CorrespondenceForm';

import urls from '../../util/urls';
import { CORRESPONDENCE_ENDPOINT } from '../../constants/endpoints';

const CorrespondenceEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, cId } = useParams();

  const handleClose = () => {
    history.push(urls.publicationRequestCorrespondenceView(prId, cId));
  };

  const { data: correspondence, isFetching } = useQuery(
    ['ui-oa', 'CorrespondenceEditRoute', 'correspondence', cId],
    () => ky(CORRESPONDENCE_ENDPOINT(cId)).json()
  );

  const { mutateAsync: putCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceEditRoute', 'putCorrespondence'],
    (data) => {
      ky.put(CORRESPONDENCE_ENDPOINT(cId), { json: data }).then(() => {
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
            isFetching={isFetching}
          />
        </form>
      )}
    </Form>
  );
};

export default CorrespondenceEditRoute;
