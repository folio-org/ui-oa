import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from '@folio/stripes/core';
import PropTypes from 'prop-types';

const Settings = lazy(() => import('./settings'));
const OARoute = lazy(() => import('./routes/OARoute'));

const scholarlyWorkRoute = lazy(() => import('./routes/scholarlyWorkViewRoute'));

class App extends React.Component {

  static propTypes = {
    actAs: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  render() {
    const { actAs, match: { path } } = this.props;

    if (actAs === 'settings') {
      return (
        <Suspense fallback={null}>
          <Settings {...this.props} />
        </Suspense>
      );
    }

    return (
      <Suspense fallback={null}>
        {/* <Switch> */}
        <Route component={OARoute} path={`${path}/:id?`}>
          <Route component={scholarlyWorkRoute} path={`${path}/:id`} />
        </Route>
        {/* </Switch> */}
      </Suspense>
    );
  }
}

export default App;
