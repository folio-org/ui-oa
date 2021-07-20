import React from 'react';

import {
  Pane,
} from '@folio/stripes/components';

const scholarlyWorkView = () => {

  const paneProps = {
    defaultWidth: '55%',
    dismissible: true,
    id: 'pane-view-scholarly-work',
  };

  return (
    <Pane
      {...paneProps}
    >
      <div>Scholarly Work</div>
    </Pane>
  )
}

export default scholarlyWorkView;