import { createRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { useFormState } from 'react-final-form';
import PropTypes from 'prop-types';

import {
  Button,
  Pane,
  PaneFooter,
  Paneset,
  PaneMenu,
  IconButton,
  HasCommand,
  checkScope,
  expandAllSections,
  ExpandAllButton,
  collapseAllSections,
  Row,
  Col,
  AccordionSet,
  AccordionStatus,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { ChargeInfoForm, PayersFieldArray } from '../../ChargeFormSections';
import Agreement from '../../PublicationRequestSections/Agreement/Agreement';
import handleSaveKeyCommand from '../../../util/keyboardShortcutHandlers';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  charge: PropTypes.object,
  request: PropTypes.object,
};

const ChargeForm = ({ handlers: { onClose, onSubmit }, charge, request }) => {
  const { pristine, submitting } = useFormState();
  const accordionStatusRef = createRef();

  const renderPaneTitle = () => (charge ? (
    <FormattedMessage id="ui-oa.charge.editCharge" />
    ) : (
      <FormattedMessage id="ui-oa.charge.newCharge" />
    ));

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

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <Button
            buttonStyle="primary mega"
            disabled={pristine || submitting}
            marginBottom0
            onClick={onSubmit}
            type="submit"
          >
            <FormattedMessage id="stripes-components.saveAndClose" />
          </Button>
        }
        renderStart={
          <Button
            buttonStyle="default mega"
            marginBottom0
            onClick={() => onClose()}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        }
      />
    );
  };

  const shortcuts = [
    {
      name: 'save',
      handler: (e) => handleSaveKeyCommand(e, onSubmit, pristine, submitting),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
  ];

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
          id="pane.oa.charge.form"
          paneTitle={renderPaneTitle()}
        >
          <ChargeInfoForm />
          <AccordionStatus ref={accordionStatusRef}>
            <Row end="xs">
              <Col xs>
                <ExpandAllButton />
              </Col>
            </Row>
            <AccordionSet initialStatus={{ 'agreement-accordion': true }}>
              <PayersFieldArray />
              <Agreement request={request} />
            </AccordionSet>
          </AccordionStatus>
        </Pane>
      </Paneset>
    </HasCommand>
  );
};

ChargeForm.propTypes = propTypes;

export default ChargeForm;
