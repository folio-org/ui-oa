import PropTypes from 'prop-types';

import { AppIcon } from '@folio/stripes/core';

import { Pane, LoadingPane } from '@folio/stripes/components';
import JournalInstances from '../../JournalSections';
import { PANE_DEFAULT_WIDTH } from '../../../constants/config';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
  queryProps: PropTypes.object
};

const Journal = ({ resource: journal, onClose, queryProps: { isLoading } }) => {
  const getSectionProps = (name) => {
    return {
      id: `journal-section-${name}`,
      journal,
    };
  };

  if (isLoading) {
    return (
      <LoadingPane
        defaultWidth={PANE_DEFAULT_WIDTH}
        dismissible
        onClose={onClose}
      />
    );
  }

  return (
    <Pane
      appIcon={<AppIcon iconKey="app" size="small" />}
      defaultWidth={PANE_DEFAULT_WIDTH}
      dismissible
      onClose={onClose}
      paneTitle={journal?.title}
    >
      <JournalInstances {...getSectionProps('journalInfo')} />
    </Pane>
  );
};

Journal.propTypes = propTypes;

export default Journal;
