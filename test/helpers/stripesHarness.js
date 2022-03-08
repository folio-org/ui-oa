/* eslint-disable react/prop-types */
import { Router } from 'react-router-dom';

import { StripesContext } from '@folio/stripes-core/src/StripesContext';

import buildStripes from '../__mock__/stripesCore.mock';

const STRIPES = buildStripes();

const defaultHistory = {
  length: 1,
  action: 'POP',
  location: {
    pathname: '/',
    search: '',
    hash: '',
    state: undefined,
    key: 'alvqi1',
  },
  index: 0,
  entries: [
    {
      pathname: '/',
      search: '',
      hash: '',
      state: undefined,
      key: 'alvqi1',
    },
  ],
  createHref: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  go: jest.fn(),
  goBack: jest.fn(),
  goForward: jest.fn(),
  canGo: jest.fn(),
  block: jest.fn(),
  listen: jest.fn(),
};

const Harness = ({ stripes, children, history = defaultHistory }) => {
  return (
    <StripesContext.Provider value={stripes || STRIPES}>
      <Router history={history}>{children}</Router>
    </StripesContext.Provider>
  );
};

export default Harness;
