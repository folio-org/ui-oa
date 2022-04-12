import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Button,
  Pane,
  PaneFooter,
  Paneset,
  PaneMenu,
  IconButton,
  LoadingView,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  formStates: PropTypes.shape({
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    isLoading: PropTypes.bool,
  }),
  titleProps: PropTypes.object,
  name: PropTypes.string,
  resource: PropTypes.object,
};

const FormPage = ({
  children,
  handlers: { onClose, onSubmit },
  formStates: { pristine, submitting, isLoading },
  titleProps,
  name,
  resource,
}) => {
  function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const renderPaneTitle = () => (resource ? (
    <FormattedMessage id={`ui-oa.${name}.edit${capitalise(name)}`} />
    ) : (
      <FormattedMessage
        id={`ui-oa.${name}.new${capitalise(name)}`}
        values={{ titleProps }}
      />
    ));
  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-oa.publicationRequest.closeForm">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id={`close-${name}-form-button`}
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

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <Paneset>
      <Pane
        appIcon={<AppIcon app="oa" />}
        centerContent
        defaultWidth="100%"
        firstMenu={renderFirstMenu()}
        footer={renderPaneFooter()}
        id={`pane.oa.${name}.form`}
        paneTitle={renderPaneTitle()}
      >
        {children}
      </Pane>
    </Paneset>
  );
};

FormPage.propTypes = propTypes;

export default FormPage;
