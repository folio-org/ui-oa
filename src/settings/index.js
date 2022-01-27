import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from 'react-intl';

import { useStripes } from '@folio/stripes/core';

import { useSettings } from '@k-int/stripes-kint-components';

import { PickListValues } from './settingsComponents';
import { REFDATA_ENDPOINT, SETTINGS_ENDPOINT } from '../constants';

const propTypes = {
  resources: PropTypes.shape({
    settings: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object)
    })
  }),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const OASettings = (props) => {
  const stripes = useStripes();
  const intl = useIntl();
  const persistentPages = [];

  if (stripes.hasPerm('settings.oa.picklists.manage')) {
    persistentPages.push({
      component: PickListValues,
      label: intl.formatMessage({ id: 'ui-oa.settings.refdata.picklistValues' }),
      route: 'pick-list-values',
    });
  }

  const { isLoading, SettingsComponent } = useSettings({
    dynamicPageExclusions: [],
    intlKey: 'ui-oa',
    persistentPages,
    refdataEndpoint: REFDATA_ENDPOINT,
    settingEndpoint: SETTINGS_ENDPOINT
  });

  if (isLoading) {
    return null;
  }

  return (
    <SettingsComponent
      {...props}
    />
  );
};

OASettings.propTypes = propTypes;

export default OASettings;
