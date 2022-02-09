import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';
import { useHistory } from 'react-router-dom';
import { Pane } from '@folio/stripes/components';

const propTypes = {
  resource: PropTypes.object,
};

const ChargeView = ({ resource: request }) => {
  const history = useHistory();

   const handleClose = () => {
    history.push(`/oa/publicationRequests/${request.id}`);
   };

  return (
    <Pane
      appIcon={<AppIcon app="oa" iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={handleClose}
      paneTitle={<FormattedMessage id="ui-oa.charge.title" />}
    />
  );
};

ChargeView.propTypes = propTypes;

export default ChargeView;
