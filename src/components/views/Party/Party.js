import React from 'react';

import PropTypes from 'prop-types';
import { AppIcon } from '@folio/stripes/core';

import {
  Pane,
} from '@folio/stripes/components';


const propTypes = {
  onClose: PropTypes.func.isRequired,
};

const Party = ({ onClose }) => {
  return (
    <Pane
      appIcon={<AppIcon app="users" iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={onClose}
    />
  );
};

Party.propTypes = propTypes;

export default Party;
