import { Form } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import FormPage from '../../components/FormPage';
import CorrespondenceInfoForm from '../../components/CorrespondenceFormSections/CorrespondenceInfoForm';

const CorrespondenceCreateRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { id } = useParams();

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${id}`);
  };

  const { mutateAsync: postCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceCreateRoute', 'postCorrespondence'],
    (data) => ky
        .post('oa/correspondence', { json: data })
        .json()
        .then(() => {
          handleClose();
        })
  );
  const submitCorrespondence = (values) => {
    const submitValues = { ...values, owner: { id } };
    postCorrespondence(submitValues);
  };

  const renderPaneTitle = () => (
    <FormattedMessage id="ui-oa.correspondence.newCorrespondence" />
  );

  return (
    <Form mutators={arrayMutators} onSubmit={submitCorrespondence}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormPage
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
            name="correspondence"
            renderPaneTitle={renderPaneTitle}
          >
            <CorrespondenceInfoForm />
          </FormPage>
        </form>
      )}
    </Form>
  );
};

export default CorrespondenceCreateRoute;
