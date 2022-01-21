import React from 'react';

import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { AppIcon } from '@folio/stripes/core';

import { Pane } from '@folio/stripes/components';

import { PartyInfo } from '../../PartySections';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
};

const Party = ({ resource: party, onClose }) => {
  const getSectionProps = (name) => {
    return {
      id: `publication-request-section-${name}`,
      party,
    };
  };

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
    >
      <PartyInfo {...getSectionProps('partyInfo')} />
    </Pane>
  );
};

Party.propTypes = propTypes;

export default Party;
