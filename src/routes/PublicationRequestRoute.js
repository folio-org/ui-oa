import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import urls from '../util/urls';

import View from '../views/publicationRequest';

const propTypes = {};

const PublicationRequestRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  const ky = useOkapiKy();
  const { data: publicationRequest } = useQuery(
    ['ui-oa', 'publicationRequestRoute', 'publicationRequest', id],
    () => ky(`oa/publicationRequest/${id}`).json()
  );

  const handleClose = () => {
    history.push(`${urls.publicationRequests()}${location.search}`);
  };

  return (
    <View
      data={{publicationRequest}}
      handlers={{
        onClose: handleClose,
      }}
    />
  );
};

PublicationRequestRoute.propTypes = propTypes;

export default PublicationRequestRoute;
