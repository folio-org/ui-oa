import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useFormState } from 'react-final-form';

import {
  Button,
  Pane,
  PaneFooter,
  Paneset,
  PaneMenu,
  IconButton,
  HasCommand,
  checkScope,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import {
  InvoiceTypedownForm,
  InvoiceLineTypedownForm,
  InvoiceHelper,
} from '../../InvoiceFormSections';

import { ChargeInfo } from '../../ChargeSections';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  queryStates: PropTypes.shape({
    isSubmitting: PropTypes.bool,
  }),
  charge: PropTypes.object,
};

const LinkInvoiceForm = ({ handlers: { onClose, onSubmit }, charge }) => {
  const { values, pristine, submitting } = useFormState();
  const [lineGenerated, setLineGenerated] = useState(false);

  const getSectionProps = (name) => {
    return {
      id: `link-invoice-section-${name}`,
      charge,
    };
  };

  const renderPaneTitle = () => (
    <FormattedMessage id="ui-oa.charge.invoice.linkInvoiceLineToCharge" />
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

  const shortcuts = [{ name: 'save', handler: onSubmit }];

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
          id="pane.oa.invoice.form"
          paneTitle={renderPaneTitle()}
        >
          <InvoiceHelper />
          <ChargeInfo {...getSectionProps('invoice-charge-info')} />
          <InvoiceTypedownForm
            {...getSectionProps('invoice-typedown')}
            setLineGenerated={setLineGenerated}
          />
          {values?.selectedInvoice && (
            <InvoiceLineTypedownForm
              {...getSectionProps('invoice-line-typedown')}
              lineGenerated={lineGenerated}
              setLineGenerated={setLineGenerated}
            />
          )}
        </Pane>
      </Paneset>
    </HasCommand>
  );
};

LinkInvoiceForm.propTypes = propTypes;

export default LinkInvoiceForm;
