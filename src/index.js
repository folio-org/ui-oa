import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from '@folio/stripes/core';
import PropTypes from 'prop-types';
import Settings from './settings';

import {
  PublicationRequestsRoute,
  PublicationRequestsSASQRoute,
  PublicationRequestRoute,
  PublicationRequestCreateRoute,
  PublicationRequestEditRoute
} from './routes';

const App = (props) => {
  const { actAs, match: { path } } = props;

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
        <Route component={PublicationRequestCreateRoute} path={`${path}/publicationRequests/create`} />
        <Route component={PublicationRequestEditRoute} path={`${path}/publicationRequests/:id/edit`} />
        <PublicationRequestsSASQRoute path={`${path}/publicationRequests`} />
        {/* <Route component={PublicationRequestsRoute} path={`${path}/publicationRequests/:id?`}>
          <Route component={PublicationRequestRoute} path={`${path}/publicationRequests/:id`} />
        </Route> */}
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
