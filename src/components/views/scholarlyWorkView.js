import React from 'react';

import PropTypes from 'prop-types';

import {
  Pane,
} from '@folio/stripes/components';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired
  }).isRequired
}

const scholarlyWorkView = ({
  handlers
}) => {
  const paneProps = {
    defaultWidth: '55%',
    dismissible: true,
    id: 'pane-view-scholarly-work',
    onClose: handlers.onClose,
  };

  return (
    <Pane
      {...paneProps}
    >
      <div>Scholarly Work</div>
    </Pane>
  )
}

scholarlyWorkView.propTypes = propTypes;

export default scholarlyWorkView;