import PropTypes from 'prop-types';
import { IconButton } from '@folio/stripes/components';
import { useHelperApp } from '@k-int/stripes-kint-components';
import { FormattedMessage } from 'react-intl';
import Workflow from '../components/Workflow';

const propTypes = {
  onClick: PropTypes.func,
};

const useOAHelperApp = () => {
  const { HelperComponent, helperToggleFunctions, isOpen } = useHelperApp({
    workflow: Workflow,
  });

  const WorkflowButton = ({ onClick = () => null }) => {
    return (
      <FormattedMessage id="ui-oa.publicationRequest.showWorkflow">
        {(ariaLabel) => (
          <IconButton
            ariaLabel={ariaLabel[0]}
            icon="check-circle"
            id="clickable-show-worflow"
            onClick={() => {
              helperToggleFunctions.workflow();
              onClick({ open: isOpen('workflow') });
            }}
          />
        )}
      </FormattedMessage>
    );
  };

  WorkflowButton.propTypes = propTypes;

  return { HelperComponent, WorkflowButton, isOpen };
};

export default useOAHelperApp;
