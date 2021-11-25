import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from 'react-intl';

import { useSettings } from '@k-int/stripes-kint-components';

import { RequestStatusEdit } from './settingsComponents';
import { REFDATA_ENDPOINT, SETTINGS_ENDPOINT } from '../constants';

const propTypes = {
  resources: PropTypes.shape({
    settings: PropTypes.shape({
      records: PropTypes.array
    })
  }),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const OASettings = (props) => {
  const intl = useIntl();
  const persistentPages = [
    {
      component: RequestStatusEdit,
      label: intl.formatMessage({ id: 'ui-oa.settings.refdata.editPicklistValues' }),
      route: 'requestStatus',
    }
  ];

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
