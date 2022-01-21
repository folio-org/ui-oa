import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  ButtonGroup,
  Button,
} from '@folio/stripes/components';
import urls from '../../../util/urls';

const propTypes = {
  primary: PropTypes.string
};

const OAFilterHeaderComponent = ({ primary }) => {
  return (
    <ButtonGroup fullWidth>
      <Button
        buttonStyle={primary === 'publicationRequests' ? 'primary' : 'default'}
        id="clickable-nav-oa-publication-requests"
        to={primary === 'publicationRequests' ? null : urls.publicationRequests()}
      >
        <FormattedMessage id="ui-oa.searchAndFilter.requests" />
      </Button>
      <Button
        buttonStyle={primary === 'people' ? 'primary' : 'default'}
        id="clickable-nav-oa-people"
        to={primary === 'people' ? null : urls.parties()}
      >
        <FormattedMessage id="ui-oa.searchAndFilter.people" />
      </Button>
      <Button
        buttonStyle={primary === 'journals' ? 'primary' : 'default'}
        id="clickable-nav-oa-journals"
      >
        <FormattedMessage id="ui-oa.searchAndFilter.journals" />
      </Button>
    </ButtonGroup>
  );
};

OAFilterHeaderComponent.propTypes = propTypes;

export default OAFilterHeaderComponent;
