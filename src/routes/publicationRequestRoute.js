import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import urls from '../util/urls';

import View from '../views/publicationRequest';

const propTypes = {}

const publicationRequestRoute = (
  ) => {
  const history = useHistory();
  const location = useLocation()

  const handleClose = () => {
    history.push(`${urls.scholarlyWorks()}${location.search}`);
  }

  return (
    <View
      handlers={{
        onClose: handleClose,
      }}
    />
  )
}

publicationRequestRoute.propTypes = propTypes;

export default publicationRequestRoute;