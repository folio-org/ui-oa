import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Pane } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import ChecklistForm from './ChecklistForm';
import testChecklist from './testChecklist';

const propTypes = {
  onToggle: PropTypes.func,
};

const Checklist = ({ onToggle }) => {
  const testSubmit = (_values) => {};

  return (
    <Pane
      appIcon={<AppIcon app="oa" size="small" />}
      defaultWidth="20%"
      dismissible
      onClose={onToggle}
      paneTitle={<FormattedMessage id="ui-oa.checklist" />}
    >
      <Form initialValues={testChecklist} onSubmit={testSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ChecklistForm checklist={testChecklist} />
          </form>
        )}
      </Form>
    </Pane>
  );
};

Checklist.propTypes = propTypes;

export default Checklist;
