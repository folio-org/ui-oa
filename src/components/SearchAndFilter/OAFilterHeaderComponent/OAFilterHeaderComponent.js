import PropTypes from 'prop-types';
import {
  ButtonGroup,
  FormattedMessage,
  Button,
} from '@folio/stripes/components';
import urls from '../../../util/urls';

const propTypes = {
  primary: PropTypes.string
};

function OAFilterHeaderComponent({ primary }) {
  return (
    <ButtonGroup fullWidth>
      <Button
        buttonStyle={primary === 'publicationRequests' ? 'primary' : 'default'}
        id="clickable-nav-oa-publication-requests"
        to={primary === 'publicationRequests' ? urls.publicationRequests() : null}
      >
        <FormattedMessage id="ui-oa.searchAndFilter.requests" />
      </Button>
      <Button
        buttonStyle={primary === 'people' ? 'primary' : 'default'}
        id="clickable-nav-oa-people"
        to={primary === 'people' ? urls.parties() : null}
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
}

OAFilterHeaderComponent.propTypes = propTypes;

export default OAFilterHeaderComponent;
