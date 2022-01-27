import PropTypes from 'prop-types';

import { AppIcon } from '@folio/stripes/core';

import { Pane } from '@folio/stripes/components';
import JournalInfo from '../../JournalSections/JournalInfo';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
};

const Journal = ({ resource: journal, onClose }) => {
  const getSectionProps = (name) => {
    return {
      id: `journal-section-${name}`,
      journal,
    };
  };

  return (
    <Pane
      appIcon={<AppIcon iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={onClose}
      paneTitle={journal?.title}
    >
      <JournalInfo {...getSectionProps('journalInfo')} />
    </Pane>
  );
};

Journal.propTypes = propTypes;

export default Journal;
