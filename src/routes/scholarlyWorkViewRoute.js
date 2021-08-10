import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import urls from '../util/urls';

import View from '../components/views/scholarlyWorkView';

const propTypes = {}

const scholarlyWorkViewRoute = (
  ) => {
  const history = useHistory();
  const location = useLocation()

  const handleClose = () => {
    // TODO: update this URL to go back to search
    history.push(`${urls.scholarlyWorks}${location.search}`);
  }

  return (
    <View
      handlers={{
        onClose: handleClose,
      }}
    />
  )
}

scholarlyWorkViewRoute.propTypes = propTypes;

export default scholarlyWorkViewRoute;