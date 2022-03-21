import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typedown } from '@k-int/stripes-kint-components';

import useTypedownData from '../../hooks/useTypedownData';


const InvoiceQueryTypedown = ({ path, pathMutator, identifier, ...rest }) => {
  const [callPath, setCallPath] = useState(pathMutator(null, path));
  const data = useTypedownData(callPath)?.[identifier];

  const onType = (e) => {
    setCallPath(pathMutator(e.target.value, path));
  };

  return <Typedown {...rest} dataOptions={data} onType={onType} />;
};

InvoiceQueryTypedown.propTypes = {
  path: PropTypes.string,
  identifier: PropTypes.string,
  pathMutator: PropTypes.func,
};

export default InvoiceQueryTypedown;
