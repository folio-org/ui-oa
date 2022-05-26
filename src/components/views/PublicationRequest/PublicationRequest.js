import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import { AppIcon } from '@folio/stripes/core';

import {
  AccordionSet,
  AccordionStatus,
  Button,
  checkScope,
  collapseAllSections,
  Col,
  ExpandAllButton,
  expandAllSections,
  HasCommand,
  Icon,
  MetaSection,
  Pane,
  Row,
  LoadingPane,
} from '@folio/stripes/components';

import {
  CorrespondingAuthor,
  Funding,
  Publication,
  PublicationStatus,
  RequestContact,
  RequestInfo,
  Correspondence,
  Agreement,
  Charges,
} from '../../PublicationRequestSections';

import urls from '../../../util/urls';
import { PANE_DEFAULT_WIDTH } from '../../../constants/config';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
  queryProps: PropTypes.object,
};

const PublicationRequest = ({
  resource: request,
  onClose,
  queryProps: { isLoading },
}) => {
  const history = useHistory();
  const params = useParams();
  const accordionStatusRef = React.createRef();

  const handleEdit = () => {
    history.push(`${urls.publicationRequestEdit(params?.id)}`);
  };

  const getSectionProps = (name) => {
    return {
      id: `publication-request-section-${name}`,
      request,
    };
  };

  const shortcuts = [
    { name: 'edit', handler: () => handleEdit() },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
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
            id="clickable-dropdown-edit-publication-request"
            onClick={handleEdit}
          >
            <Icon icon="edit">
              <FormattedMessage id="ui-oa.publicationRequest.edit" />
            </Icon>
          </Button>
        )}
        appIcon={<AppIcon app="oa" iconKey="app" size="small" />}
        defaultWidth={PANE_DEFAULT_WIDTH}
        dismissible
        onClose={onClose}
        paneSub={request?.publicationTitle}
        paneTitle={
          <FormattedMessage
            id="ui-oa.publicationRequest.requestTitle"
            values={{ number: request?.requestNumber }}
          />
        }
      >
        <MetaSection
          contentId="publicationRequestMetaContent"
          createdDate={request?.dateCreated}
          hideSource
          lastUpdatedDate={request?.lastUpdated}
        />

        <RequestInfo {...getSectionProps('info')} />
        <AccordionStatus ref={accordionStatusRef}>
          <Row end="xs">
            <Col xs>
              <ExpandAllButton />
            </Col>
          </Row>
          <AccordionSet>
            {request?.correspondingAuthor?.id && (
              <CorrespondingAuthor
                {...getSectionProps('correspondingAuthor')}
              />
            )}
            {request?.requestContact?.id && (
              <RequestContact {...getSectionProps('requestContact')} />
            )}
            <Publication {...getSectionProps('publication')} />
            <PublicationStatus {...getSectionProps('publicationStatus')} />
            {request?.fundings && <Funding {...getSectionProps('funding')} />}

            {(request?.agreement || request?.withoutAgreement) && (
              <Agreement {...getSectionProps('agreement')} />
            )}
            <Correspondence {...getSectionProps('correspondences')} />
            <Charges {...getSectionProps('correspondences')} />
          </AccordionSet>
        </AccordionStatus>
      </Pane>
    </HasCommand>
  );
};

PublicationRequest.propTypes = propTypes;

export default PublicationRequest;
