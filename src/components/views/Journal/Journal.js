import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

import { AppIcon, useOkapiKy } from '@folio/stripes/core';

import { Pane, LoadingPane, Button, Icon } from '@folio/stripes/components';
import JournalInstances from '../../JournalSections';
import { PANE_DEFAULT_WIDTH } from '../../../constants/config';
import urls from '../../../util/urls';
import { RelatedRequests } from '../../PartySections';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
  queryProps: PropTypes.object,
};

const Journal = ({ resource: journal, onClose, queryProps: { isLoading } }) => {
  const ky = useOkapiKy();
  const history = useHistory();

  const { data: publicationRequests } = useQuery(
    ['ui-oa', 'party', 'publicationRequests', journal.id],
    () => ky(`oa/publicationRequest?filters=work.id==${journal.id}`).json()
  );

  const getSectionProps = (name) => {
    return {
      id: `journal-section-${name}`,
      journal,
    };
  };

  const handleEdit = () => {
    history.push(urls.journalEdit(journal?.id));
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

  const renderActionMenu = () => {
    return (
      <Button
        buttonStyle="dropdownItem"
        id="journal-edit-button"
        onClick={handleEdit}
      >
        <Icon icon="edit">
          <FormattedMessage id="ui-oa.journal.edit" />
        </Icon>
      </Button>
    );
  };

  return (
    <Pane
      actionMenu={renderActionMenu}
      appIcon={<AppIcon iconKey="app" size="small" />}
      defaultWidth={PANE_DEFAULT_WIDTH}
      dismissible
      onClose={onClose}
      paneTitle={journal?.title}
    >
      <JournalInstances {...getSectionProps('journalInfo')} />
      {!!publicationRequests?.length && (
        <RelatedRequests requests={publicationRequests} />
      )}
    </Pane>
  );
};

Journal.propTypes = propTypes;

export default Journal;
