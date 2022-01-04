import { FormattedMessage } from 'react-intl';

import {
  Pane,
  Paneset,
  PaneMenu,
  IconButton,
} from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';
import PropTypes from 'prop-types';


const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired
  }).isRequired,
};


const CorrespondenceView = ({ handlers: { onClose } }) => {
  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-oa.publicationRequest.closeForm">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-correspondence-view-button"
              onClick={() => onClose()}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  return (
    <Paneset>
      <Pane
        appIcon={<AppIcon app="oa" />}
        centerContent
        defaultWidth="100%"
        firstMenu={renderFirstMenu()}
        id="pane.oa.correspondence.view"
        paneTitle={<FormattedMessage id="ui-oa.correspondence.view" />}
      />
    </Paneset>
  );
};

CorrespondenceView.propTypes = propTypes;

export default CorrespondenceView;
