import React, { Suspense, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Settings from './settings';

import {
  PublicationRequestsRoute,
  PublicationRequestCreateRoute,
  PublicationRequestEditRoute
} from './routes';
import { useSASQRouteUpdate } from '../../stripes-kint-components/src';

const App = (props) => {
  const { actAs, match: { path } } = props;


  const {
    forceListUpdate,
    forceViewUpdate,
    listUpdateCount,
    viewUpdateCount
  } = useSASQRouteUpdate();

  if (actAs === 'settings') {
    return (
      <Suspense fallback={null}>
        <Settings {...props} />
      </Suspense>
    );
  }


  return (
    <Suspense fallback={null}>
      <Switch>
        <Route
          path={`${path}/publicationRequests/create`}
          render={routeProps => (
            <PublicationRequestCreateRoute
              forceListUpdate={forceListUpdate}
              {...routeProps}
            />
          )}
        />
        <Route
          path={`${path}/publicationRequests/:id/edit`}
          render={routeProps => (
            <PublicationRequestEditRoute
              forceListUpdate={forceListUpdate}
              forceViewUpdate={forceViewUpdate}
              {...routeProps}
            />
          )}
        />
        <PublicationRequestsRoute
          data={{
            listUpdateCount,
            viewUpdateCount
          }}
          path={`${path}/publicationRequests`}
        />
      </Switch>
    </Suspense>
  );
};

App.propTypes = {
  actAs: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  stripes: PropTypes.object.isRequired,
};

export default App;
