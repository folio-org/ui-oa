import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';

import { Pane } from '@folio/stripes/components';

const propTypes = {
  onClose: PropTypes.func,
};

const ChargeView = ({ onClose }) => {
  return (
    <Pane
      appIcon={<AppIcon app="oa" iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={onClose}
      paneTitle={<FormattedMessage id="ui-oa.charge.title" />}
    />
  );
};

ChargeView.propTypes = propTypes;

export default ChargeView;
