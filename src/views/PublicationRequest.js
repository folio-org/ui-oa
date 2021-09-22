import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  AccordionSet,
  Button,
  Icon,
  MetaSection,
  Pane,
} from '@folio/stripes/components';
import RequestInfo from '../components/PublicationRequestSections/RequestInfo/RequestInfo';
import CorrespondingAuthor from '../components/PublicationRequestSections/CorrespondingAuthor/CorrespondingAuthor';
import Publication from '../components/PublicationRequestSections/Publication/Publication';

const propTypes = {
  data: PropTypes.object,
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired
  }).isRequired
};

const PublicationRequest = ({ handlers, data: { publicationRequest: request } = {} }) => {
  const paneProps = {
    defaultWidth: '55%',
    dismissible: true,
    onClose: handlers.onClose,
  };
  return (
    <Pane
      {...paneProps}
      actionMenu={() => (
        <Button
          buttonStyle="dropdownItem"
          id="clickable-dropdown-edit-publication-request"
        // onClick={handlers.onEdit}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-oa.publicationRequest.edit" />
          </Icon>
        </Button>
      )}
      paneTitle={<FormattedMessage id="ui-oa.publicationRequest.requestTitle" values={{ number: request?.requestNumber }} />}
    >
      <MetaSection
        contentId="publicationRequestMetaContent"
        createdDate={request?.dateCreated}
        hideSource
        lastUpdatedDate={request?.dateModified}
      />
      <RequestInfo request={request} />
      <AccordionSet>
        <CorrespondingAuthor request={request} />
        <Publication request={request} />
      </AccordionSet>
    </Pane>
  );
};

PublicationRequest.propTypes = propTypes;

export default PublicationRequest;
