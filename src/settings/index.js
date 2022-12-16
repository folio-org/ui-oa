import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from 'react-intl';

import { useSettings } from '@k-int/stripes-kint-components';

import { ChecklistItemDefinitions, PickListValues } from './settingsComponents';
import { REFDATA_ENDPOINT, SETTINGS_ENDPOINT } from '../constants/endpoints';

const propTypes = {
  resources: PropTypes.shape({
    settings: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const OASettings = (props) => {
  const intl = useIntl();
  const persistentPages = [];

  persistentPages.push({
    component: PickListValues,
    label: intl.formatMessage({ id: 'ui-oa.settings.refdata.picklistValues' }),
    route: 'pick-list-values',
  });

  persistentPages.push({
    component: ChecklistItemDefinitions,
    label: intl.formatMessage({
      id: 'ui-oa.settings.checklistItemDefinitions',
    }),
    route: 'checklist-items',
  });

  const { isLoading, SettingsComponent } = useSettings({
    dynamicPageExclusions: [],
    intlKey: 'ui-oa',
    persistentPages,
    refdataEndpoint: REFDATA_ENDPOINT,
    settingEndpoint: SETTINGS_ENDPOINT,
    useIconButtonsEdit: false,
  });

  if (isLoading) {
    return null;
  }

  return <SettingsComponent {...props} />;
};

OASettings.propTypes = propTypes;

export default OASettings;
