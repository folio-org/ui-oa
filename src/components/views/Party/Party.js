import React from 'react';

import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { AppIcon } from '@folio/stripes/core';

import { Pane } from '@folio/stripes/components';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
};

const Party = ({ resource: party, onClose }) => {
  return (
    <Pane
      appIcon={<AppIcon app="users" iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={onClose}
      paneTitle={
        <FormattedMessage
          id="ui-oa.party.familyNameOrdered"
          values={{
            familyName: party?.familyName,
            givenNames: party?.givenNames,
          }}
        />
      }
    />
  );
};

Party.propTypes = propTypes;

export default Party;
