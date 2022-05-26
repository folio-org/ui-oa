import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { AppIcon, useOkapiKy } from '@folio/stripes/core';
import {
  Pane,
  Button,
  Icon,
  LoadingPane,
  FormattedUTCDate,
  checkScope,
  HasCommand,
} from '@folio/stripes/components';

import PartyInfo from '../../PartySections';
import RelatedRequests from '../../RelatedRequests';
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
    () => ky(
        `oa/publicationRequest?filters=correspondingAuthor.partyOwner.id==${party.id}`
      ).json()
  );

  const getSectionProps = (name) => {
    return {
      id: `party-section-${name}`,
      party,
    };
  };

  const sortFormatter = {
    requestStatus: 'requestStatus.label',
  };

  const requestsFormatter = [
    {
      name: 'requestNumber',
      translation: (
        <FormattedMessage id="ui-oa.publicationRequest.requestNumber" />
      ),
      format: (d) => (
        <Link to={urls.publicationRequest(d?.id)}>{d?.requestNumber}</Link>
      ),
    },
    {
      name: 'requestDate',
      translation: (
        <FormattedMessage id="ui-oa.publicationRequest.requestDate" />
      ),
      format: (d) => (d?.requestDate ? <FormattedUTCDate value={d.requestDate} /> : ''),
    },
    {
      name: 'requestStatus',
      translation: <FormattedMessage id="ui-oa.publicationRequest.status" />,
      format: (d) => d?.requestStatus?.label,
    },
    {
      name: 'publicationTitle',
      translation: (
        <FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />
      ),
      format: (d) => d?.publicationTitle,
    },
  ];

  const handleEdit = () => {
    history.push(`${urls.partyEdit(params?.id)}`);
  };

  const shortcuts = [
    {
      name: 'edit',
      handler: () => handleEdit(),
    },
  ];

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
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
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
          <RelatedRequests
            requests={publicationRequests}
            requestsFormatter={requestsFormatter}
            sortFormatter={sortFormatter}
          />
        )}
      </Pane>
    </HasCommand>
  );
};

Party.propTypes = propTypes;

export default Party;
