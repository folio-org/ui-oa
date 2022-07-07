import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  onToggle: PropTypes.func,
};

const Workflow = ({ onToggle }) => {
  return (
    <Pane
      appIcon={<AppIcon app="oa" size="small" />}
      defaultWidth="20%"
      dismissible
      onClose={onToggle}
      paneTitle={<FormattedMessage id="ui-oa.workflow.criteria" />}
    />
  );
};

Workflow.propTypes = propTypes;

export default Workflow;
