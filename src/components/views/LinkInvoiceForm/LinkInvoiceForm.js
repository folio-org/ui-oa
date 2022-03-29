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
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import {
  InvoiceTypedownForm,
  InvoiceLineTypedownForm
} from '../../InvoiceFormSections';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  charge: PropTypes.object,
};

const LinkInvoiceForm = ({
  handlers: { onClose, onSubmit },
  pristine,
  submitting,
  charge,
}) => {
  const { values } = useFormState();
  const getSectionProps = (name) => {
    return {
      id: `link-invoice-section-${name}`,
      charge,
    };
  };

  const renderPaneTitle = () => (
    <FormattedMessage id="ui-oa.charge.invoice.linkInvoice" />
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
  return (
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
        <InvoiceTypedownForm {...getSectionProps('invoiceTypedown')} />
        {values?.selectedInvoice &&
        <InvoiceLineTypedownForm {...getSectionProps('invoiceLineTypedown')} />
        }
      </Pane>
    </Paneset>
  );
};

LinkInvoiceForm.propTypes = propTypes;

export default LinkInvoiceForm;
