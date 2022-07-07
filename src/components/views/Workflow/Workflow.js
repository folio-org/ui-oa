import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Pane } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import WorkflowForm from './WorkflowForm';
import testCriteria from './testCriteria';

const propTypes = {
  onToggle: PropTypes.func,
};

const Workflow = ({ onToggle }) => {
  const testSubmit = (_values) => {
  };

  return (
    <Pane
      appIcon={<AppIcon app="oa" size="small" />}
      defaultWidth="20%"
      dismissible
      onClose={onToggle}
      paneTitle={<FormattedMessage id="ui-oa.workflow.checklist" />}
    >
      <Form initialValues={testCriteria} onSubmit={testSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <WorkflowForm checklist={testCriteria} />
          </form>
        )}
      </Form>
    </Pane>
  );
};

Workflow.propTypes = propTypes;

export default Workflow;
