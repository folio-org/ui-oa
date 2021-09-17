import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from '@folio/stripes/core';
import PropTypes from 'prop-types';
import Settings from './settings';

import {
  OARoute,
  PublicationRequestRoute,
  PublicationRequestCreateRoute
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
        <Route component={OARoute} path={`${path}/publicationRequests/:id?`}>
          <Route component={PublicationRequestRoute} path={`${path}/publicationRequests/:id`} />
        </Route>
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
