import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { AppIcon, useOkapiKy } from '@folio/stripes/core';
import { Pane, Button, Icon, LoadingPane } from '@folio/stripes/components';

import { PartyInfo, RelatedRequests } from '../../PartySections';
import urls from '../../../util/urls';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
  queryProps: PropTypes.object,
};

const Party = ({ resource: party, onClose, queryProps: { isLoading } }) => {
  const ky = useOkapiKy();
  const history = useHistory();
  const params = useParams();

  const { data: publicationRequests } = useQuery(
    ['ui-oa', 'party', 'publicationRequests'],
    () => ky('oa/publicationRequest').json()
  );

  const relatedRequests = publicationRequests?.filter(
    (request) => request?.correspondingAuthor?.partyOwner?.id === party?.id
  );

  const getSectionProps = (name) => {
    return {
      id: `party-section-${name}`,
      party,
    };
  };

  const handleEdit = () => {
    history.push(`${urls.partyEdit(params?.id)}`);
  };

  if (isLoading) {
    return <LoadingPane dismissable onClose={onClose} />;
  }

  return (
    <Pane
      actionMenu={() => (
        <Button
          buttonStyle="dropdownItem"
          id="clickable-dropdown-edit-party"
          onClick={handleEdit}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-oa.party.edit" />
          </Icon>
        </Button>
      )}
      appIcon={<AppIcon iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={onClose}
      paneTitle={
        <FormattedMessage
          id="ui-oa.party.familyNameOrdered"
          values={{
            familyName: party?.familyName,
            givenNames: party?.givenNames,
          }}
        />
      }
    >
      <PartyInfo {...getSectionProps('partyInfo')} />
      {relatedRequests && <RelatedRequests requests={relatedRequests} />}
    </Pane>
  );
};

Party.propTypes = propTypes;

export default Party;
