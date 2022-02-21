import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Settings from './settings';

import {
  PublicationRequestsRoute,
  PublicationRequestCreateRoute,
  PublicationRequestEditRoute,
  CorrespondenceCreateRoute,
  CorrespondenceViewRoute,
  CorrespondenceEditRoute,
  PartiesRoute,
  PartiesEditRoute,
  JournalsRoute,
  ChargeCreateRoute,
  LinkInvoiceRoute,
} from './routes';

const App = (props) => {
  const {
    actAs,
    match: { path },
  } = props;

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
          component={PublicationRequestCreateRoute}
          path={`${path}/publicationRequests/create`}
        />
        <Route
          component={PublicationRequestEditRoute}
          path={`${path}/publicationRequests/:id/edit`}
        />
        <Route
          component={CorrespondenceCreateRoute}
          path={`${path}/publicationRequests/:id/correspondence/create`}
        />
        <Route
          component={CorrespondenceEditRoute}
          path={`${path}/publicationRequests/:prId/correspondence/:cId/edit`}
        />
        <Route
          component={CorrespondenceViewRoute}
          path={`${path}/publicationRequests/:prId/correspondence/:cId`}
        />
        <Route
          component={LinkInvoiceRoute}
          path={`${path}/publicationRequests/:prId/charge/:chId/linkInvoice`}
        />
        <Route
          component={ChargeCreateRoute}
          path={`${path}/publicationRequests/:id/charge/create`}
        />
        <Route component={PartiesEditRoute} path={`${path}/people/:id/edit`} />
        <PartiesRoute path={`${path}/people`} />
        <JournalsRoute path={`${path}/journals`} />
        <PublicationRequestsRoute path={`${path}/publicationRequests`} />
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
