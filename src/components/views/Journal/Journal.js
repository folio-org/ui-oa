import PropTypes from 'prop-types';

import { AppIcon } from '@folio/stripes/core';

import { Pane } from '@folio/stripes/components';



const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
};

const Journal = ({ resource: journal, onClose }) => {
  return (
    <Pane
      appIcon={<AppIcon iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={onClose}
      paneTitle={journal?.title}
    />
  );
};

Journal.propTypes = propTypes;

export default Journal;
