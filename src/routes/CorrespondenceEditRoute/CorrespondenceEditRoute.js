import { Form } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import arrayMutators from 'final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import FormPage from '../../components/FormPage';
import CorrespondenceInfoForm from '../../components/CorrespondenceFormSections/CorrespondenceInfoForm';

const CorrespondenceEditRoute = () => {
  const history = useHistory();
  const ky = useOkapiKy();
  const { prId, cId } = useParams();

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${prId}`);
  };

  const { data: correspondence, isLoading } = useQuery(
    ['ui-oa', 'CorrespondenceEditRoute', 'correspondence', cId],
    () => ky(`oa/correspondence/${cId}`).json()
  );

  const { mutateAsync: putCorrespondence } = useMutation(
    ['ui-oa', 'CorrespondenceEditRoute', 'putCorrespondence'],
    (data) => ky.put(`oa/correspondence/${cId}`, { json: data }).then(() => {
        handleClose();
      })
  );
  const submitCorrespondence = (values) => {
    putCorrespondence(values);
  };

  const renderPaneTitle = () => (
    <FormattedMessage id="ui-oa.correspondence.editCorrespondence" />
  );

  return (
    <Form
      initialValues={correspondence}
      mutators={arrayMutators}
      onSubmit={submitCorrespondence}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormPage
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
            isLoading={isLoading}
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

export default CorrespondenceEditRoute;
