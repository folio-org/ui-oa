import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { AppIcon, useOkapiKy } from '@folio/stripes/core';
import { Pane, Button, Icon, LoadingPane } from '@folio/stripes/components';

import { PartyInfo, RelatedRequests } from '../../PartySections';
import urls from '../../../util/urls';
import { PANE_DEFAULT_WIDTH } from '../../../constants/config';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
  queryProps: PropTypes.object,
};

const Party = ({ resource: party, onClose, queryProps: { isLoading } }) => {
  const ky = useOkapiKy();
  const history = useHistory();
  const params = useParams();

  // Filter publication requests in which the corresponding author matches the current party
  const { data: publicationRequests } = useQuery(
    ['ui-oa', 'party', 'publicationRequests', party.id],
    () => ky(`oa/publicationRequest?filters=correspondingAuthor.partyOwner.id==${party.id}`).json()
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
    return (
      <LoadingPane
        defaultWidth={PANE_DEFAULT_WIDTH}
        dismissible
        onClose={onClose}
      />
    );
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
      defaultWidth={PANE_DEFAULT_WIDTH}
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
      {!!publicationRequests?.length && (
        <RelatedRequests requests={publicationRequests} />
      )}
    </Pane>
  );
};

Party.propTypes = propTypes;

export default Party;
