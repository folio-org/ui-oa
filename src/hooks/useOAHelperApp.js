import PropTypes from 'prop-types';
import { IconButton } from '@folio/stripes/components';
import { useHelperApp } from '@k-int/stripes-kint-components';
import { FormattedMessage } from 'react-intl';
import Checklist from '../components/Checklist';

const propTypes = {
  onClick: PropTypes.func,
};

const useOAHelperApp = () => {
  const { HelperComponent, helperToggleFunctions, isOpen } = useHelperApp({
    checklist: Checklist,
  });

  const ChecklistButton = ({ onClick = () => null }) => {
    return (
      <FormattedMessage id="ui-oa.publicationRequest.showChecklist">
        {(ariaLabel) => (
          <IconButton
            ariaLabel={ariaLabel[0]}
            icon="check-circle"
            id="clickable-show-checklist"
            onClick={() => {
              helperToggleFunctions.checklist();
              onClick({ open: isOpen('checklist') });
            }}
          />
        )}
      </FormattedMessage>
    );
  };

  ChecklistButton.propTypes = propTypes;

  return { HelperComponent, ChecklistButton, isOpen };
};

export default useOAHelperApp;
