import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
  PaneMenu,
  Paneset,
} from '@folio/stripes/components';

import {
  CollapseFilterPaneButton,
} from '@folio/stripes/smart-components';
import { FormattedMessage } from 'react-intl';

const propTypes = {
};

export default function OAView() {

  return (
    <Paneset>
      <Pane
          defaultWidth="20%"
          paneTitle="sidepane"
        >
      </Pane>
      <Pane
        defaultWidth="fill"
      >
        <p> This is where the OA app will go </p>
      </Pane>
    </Paneset>
  );
}

OAView.propTypes = propTypes;
