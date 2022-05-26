import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useMutation } from 'react-query';
import CorrespondenceForm from '../../components/views/CorrespondenceForm';

const CorrespondenceCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { id } = useParams();

  const handleClose = (cId) => {
    if (cId) {
      history.push(`/oa/publicationRequests/${id}/correspondence/${cId}`);
    } else {
      history.push(`/oa/publicationRequests/${id}`);
    }
  };

  const { mutateAsync: postCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceCreateRoute', 'postCorrespondence'],
    (data) => ky
        .post('oa/correspondence', { json: data })
        .json()
        .then((res) => {
          handleClose(res?.id);
        })
  );
  const submitCorrespondence = async (values) => {
    const submitValues = { ...values, owner: { id } };
    await postCorrespondence(submitValues);
  };

  return (
    <Form mutators={arrayMutators} onSubmit={submitCorrespondence}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CorrespondenceForm
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

export default CorrespondenceCreateRoute;
