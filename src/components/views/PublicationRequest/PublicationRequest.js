import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import { AppIcon } from '@folio/stripes/core';

import {
  AccordionSet,
  Button,
  Icon,
  MetaSection,
  Pane,
} from '@folio/stripes/components';
import {
  CorrespondingAuthor,
  Funding,
  Publication,
  PublicationStatus,
  RequestContact,
  RequestInfo
} from '../../PublicationRequestSections';

import urls from '../../../util/urls';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object
};

const PublicationRequest = ({ resource: request, onClose }) => {
  const history = useHistory();
  const params = useParams();

  const handleEdit = () => {
    history.push(`${urls.publicationRequestEdit(params?.id)}`);
  };

  const getSectionInfo = (name) => {
    return {
      id: `publication-request-section-${name}`,
      request
    };
  };

  return (
    <Pane
      actionMenu={() => (
        <Button
          buttonStyle="dropdownItem"
          id="clickable-dropdown-edit-publication-request"
          onClick={handleEdit}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-oa.publicationRequest.edit" />
          </Icon>
        </Button>
      )}
      appIcon={<AppIcon app="oa" iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={onClose}
      paneSub={request?.publicationTitle !== undefined ? request?.publicationTitle : ''}
      paneTitle={<FormattedMessage id="ui-oa.publicationRequest.requestTitle" values={{ number: request?.requestNumber }} />}
    >
      <MetaSection
        contentId="publicationRequestMetaContent"
        createdDate={request?.dateCreated}
        hideSource
        lastUpdatedDate={request?.lastUpdated}
      />
      <RequestInfo request={request} />
      <AccordionSet>
        <CorrespondingAuthor {...getSectionInfo('correspondingAuthor')} />
        <RequestContact {...getSectionInfo('requestContact')} />
        <Publication {...getSectionInfo('publication')} />
        <PublicationStatus {...getSectionInfo('publicationStatus')} />
        <Funding {...getSectionInfo('funding')} />
      </AccordionSet>
    </Pane>
  );
};

PublicationRequest.propTypes = propTypes;

export default PublicationRequest;
