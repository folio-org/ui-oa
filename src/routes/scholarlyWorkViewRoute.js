import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import View from '../components/views/scholarlyWorkView';

const propTypes = {}

const scholarlyWorkViewRoute = (
  ) => {
  const history = useHistory();

  const handleClose = () => {
    history.push('/oa');
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