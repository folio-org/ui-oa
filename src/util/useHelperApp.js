import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import queryString from 'query-string';

const useHelperApp = (helpers) => {
  const history = useHistory();
  const location = useLocation();

  const query = queryString.parse(location.search);

  const [currentHelper, setCurrentHelper] = useState(query?.helper);
  const [helperToggleFunctions, setHelperToggleFunctions] = useState({});

  const handleToggleHelper = useCallback((helper) => {
    setCurrentHelper(helper !== currentHelper ? helper : undefined);
  }, [currentHelper]);

  useEffect(() => {
    if (currentHelper !== query?.helper) {
      const newQuery = {
        ...query,
        helper: currentHelper
      };

      history.push({
        pathname: location.pathname,
        search: `?${queryString.stringify(newQuery)}`
      });
    }
  }, [currentHelper, history, location, query]);

  useEffect(() => {
    const newHelperToggleFunctions = { ...helperToggleFunctions };
    Object.keys(helpers).forEach(h => {
      newHelperToggleFunctions[h] = () => handleToggleHelper(h);
    });

    if (isEqual(helperToggleFunctions, newHelperToggleFunctions)) {
      setHelperToggleFunctions(newHelperToggleFunctions);
    }
  }, [helpers, helperToggleFunctions, handleToggleHelper]);

  const HelperComponent = useMemo(() => ((props) => {
    if (!query?.helper) return null;

    let Component = null;

    Component = helpers[query?.helper];

    if (!Component) return null;

    return (
      <Component
        onToggle={() => handleToggleHelper(query?.helper)}
        {...props}
      />
    );
  }), [handleToggleHelper, query.helper, helpers]);




  return { HelperComponent, helperToggleFunctions };
};

export default useHelperApp;


// helpers =
