import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ResponsiveButtonGroup } from '@k-int/stripes-kint-components';

import {
  Button,
} from '@folio/stripes/components';
import urls from '../../../util/urls';

const propTypes = {
  primary: PropTypes.string
};

const OAFilterHeaderComponent = ({ primary }) => {
  let selectedIndex;

  switch (primary) {
    case 'publicationRequests':
      selectedIndex = 0;
      break;
    case 'people':
      selectedIndex = 1;
      break;
    case 'journals':
      selectedIndex = 2;
      break;
    default:
      break;
  }

  return (
    <ResponsiveButtonGroup
      fullWidth
      selectedIndex={selectedIndex}
    >
      <Button
        key="clickable-nav-oa-publication-requests"
        id="clickable-nav-oa-publication-requests"
        to={primary === 'publicationRequests' ? null : urls.publicationRequests()}
      >
        <FormattedMessage id="ui-oa.searchAndFilter.requests" />
      </Button>
      <Button
        key="clickable-nav-oa-people"
        id="clickable-nav-oa-people"
        to={primary === 'people' ? null : urls.parties()}
      >
        <FormattedMessage id="ui-oa.searchAndFilter.people" />
      </Button>
      <Button
        key="clickable-nav-oa-journals"
        id="clickable-nav-oa-journals"
        to={primary === 'journals' ? null : urls.journals()}
      >
        <FormattedMessage id="ui-oa.searchAndFilter.journals" />
      </Button>
    </ResponsiveButtonGroup>
  );
};

OAFilterHeaderComponent.propTypes = propTypes;

export default OAFilterHeaderComponent;
