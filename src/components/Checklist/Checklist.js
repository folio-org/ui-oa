import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';
import { useMutation, useQueryClient } from 'react-query';
import { AppIcon, useNamespace, useOkapiKy } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import ChecklistForm from './ChecklistForm';
import { PUBLICATION_REQUEST_ENDPOINT } from '../../constants/endpoints';

const propTypes = {
  onToggle: PropTypes.func,
  resource: PropTypes.object,
};

const Checklist = ({ onToggle, resource }) => {
  const [namespace] = useNamespace();
  const queryClient = useQueryClient();
  const ky = useOkapiKy();

  const { mutateAsync: putChecklist } = useMutation(
    ['Checklist', 'putChecklist'],
    (data) => {
      ky.put(PUBLICATION_REQUEST_ENDPOINT(resource.id), { json: data })
        .then(() => {
          queryClient.invalidateQueries([namespace, 'data', 'view', resource?.id]);
        });
    }
  );

  const handleSubmit = async (values, item) => {
    const submitValues = { checklist: [{ ...item, ...values }] };
    await putChecklist(submitValues);
  };

  return (
    <Pane
      appIcon={<AppIcon app="oa" size="small" />}
      defaultWidth="20%"
      dismissible
      onClose={onToggle}
      paneTitle={<FormattedMessage id="ui-oa.checklist" />}
    >
      <ChecklistForm
        checklist={resource.checklist}
        handleSubmit={handleSubmit}
        ownerId={resource.id}
      />
    </Pane>
  );
};

Checklist.propTypes = propTypes;

export default Checklist;
