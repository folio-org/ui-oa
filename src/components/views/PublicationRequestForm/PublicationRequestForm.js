import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useForm, useFormState } from 'react-final-form';
import { AppIcon } from '@folio/stripes/core';

import {
  AccordionSet,
  AccordionStatus,
  Button,
  Pane,
  PaneFooter,
  PaneHeader,
  Paneset,
  PaneMenu,
  IconButton,
  HasCommand,
  checkScope,
  collapseAllSections,
  expandAllSections,
  ExpandAllButton,
  Row,
  Col
} from '@folio/stripes/components';
import {
  CorrespondingAuthorForm,
  FundingForm,
  PublicationForm,
  PublicationStatusForm,
  RequestContactForm,
  RequestInfoForm,
  LinkAgreementForm
} from '../../PublicationRequestFormSections';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }).isRequired,
  pristine: PropTypes.bool,
  publicationRequest: PropTypes.object,
  submitting: PropTypes.bool,
};


const PublicationRequestForm = ({ handlers: { onClose, onSubmit }, pristine, publicationRequest, submitting }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const accordionStatusRef = React.createRef();

  useEffect(() => {
    if (
      values.useCorrespondingAuthor &&
      values.requestContact?.partyOwner !== values.correspondingAuthor?.partyOwner
    ) {
      change('requestContact.partyOwner', values.correspondingAuthor?.partyOwner);
    }
  }, [change, values]);

  const shortcuts = [
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
  ];

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={(
          <Button
            buttonStyle="primary mega"
            disabled={pristine || submitting}
            marginBottom0
            onClick={onSubmit}
            type="submit"
          >
            <FormattedMessage id="stripes-components.saveAndClose" />
          </Button>
        )}
        renderStart={(
          <Button
            buttonStyle="default mega"
            marginBottom0
            onClick={() => onClose()}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        )}
      />
    );
  };

  const renderPaneTitle = () => (
    publicationRequest ?
      <FormattedMessage id="ui-oa.publicationRequest.editPublicationRequest" values={{ id: publicationRequest.requestNumber }} /> :
      <FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest" />
  );

  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-oa.publicationRequest.closeForm">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-publicationRequest-form-button"
              onClick={() => onClose()}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Paneset>
        <Pane
          appIcon={<AppIcon app="oa" />}
          centerContent
          defaultWidth="100%"
          firstMenu={renderFirstMenu()}
          footer={renderPaneFooter()}
          renderHeader={(renderProps) => (
            <PaneHeader {...renderProps} paneTitle={renderPaneTitle()} />
          )}
        >
          <AccordionStatus ref={accordionStatusRef}>
            <Row end="xs">
              <Col xs>
                <ExpandAllButton />
              </Col>
            </Row>
            <AccordionSet>
              <RequestInfoForm />
              <CorrespondingAuthorForm />
              <RequestContactForm />
              <PublicationForm />
              <PublicationStatusForm />
              <FundingForm />
              <LinkAgreementForm />
            </AccordionSet>
          </AccordionStatus>
        </Pane>
      </Paneset>
    </HasCommand>
  );
};

PublicationRequestForm.propTypes = propTypes;

export default PublicationRequestForm;
