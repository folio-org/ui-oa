import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  AppIcon,
} from '@folio/stripes/core';

import { SASQRoute } from '@k-int/stripes-kint-components';
import { OAFilterHeaderComponent } from '../components/SearchAndFilter';

const JournalsRoute = ({ path }) => {
  const renderHeaderComponent = () => {
    return <OAFilterHeaderComponent primary="journals" />;
  };

  const fetchParameters = {
    endpoint: 'oa/works',
    SASQ_MAP: {
      searchKey: 'title',
      filterKeys: {
      }
    }
  };

  const resultColumns = [
    {
      propertyPath:'title',
      label: <FormattedMessage id="ui-oa.journals.title" />
    },
  ];

  const formatter = {
    title: d => (
      <AppIcon
        iconAlignment="baseline"
        iconKey="app"
        size="small"
      >
        {d?.title}
      </AppIcon>
    ),
  };

  const initialSortState = {
    sort: 'title'
  };

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      FilterPaneHeaderComponent={renderHeaderComponent}
      id="journals-sasq"
      mainPaneProps={{
        appIcon: <AppIcon iconKey="app" size="small" />,
        paneTitle: <FormattedMessage id="ui-oa.journals" />,
      }}
      mclProps={{ formatter }}
      path={path}
      resultColumns={resultColumns}
      sasqProps={{ initialSortState }}
      // ViewComponent={}
    />
  );
};

JournalsRoute.propTypes = {
  path: PropTypes.string.isRequired
};

export default JournalsRoute;
