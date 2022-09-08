import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@folio/stripes/components';
import { useHelperApp } from '@k-int/stripes-kint-components';
import { FormattedMessage } from 'react-intl';
import Checklist from '../components/Checklist';
import { ChecklistIcon } from '../components/CustomIcons';

const propTypes = {
  onClick: PropTypes.func,
};

const useOAHelperApp = () => {
  const { HelperComponent, helperToggleFunctions, isOpen } = useHelperApp({
    checklist: Checklist,
  });

  const ChecklistButton = ({ onClick = () => null }) => {
    return (
      <Tooltip
        id="checklist-helper-toggle-button"
        text={
          isOpen('checklist') === true ? (
            <FormattedMessage id="ui-oa.checklist.closeChecklistPane" />
          ) : (
            <FormattedMessage id="ui-oa.checklist.openChecklistPane" />
          )
        }
      >
        {({ ref, ariaIds }) => (
          <IconButton
            ref={ref}
            aria-describedby={ariaIds.sub}
            aria-labelledby={ariaIds.text}
            icon={ChecklistIcon}
            id="clickable-show-checklist"
            onClick={() => {
              helperToggleFunctions.checklist();
              onClick({ open: isOpen('checklist') });
            }}
          />
        )}
      </Tooltip>
    );
  };

  ChecklistButton.propTypes = propTypes;

  return { HelperComponent, ChecklistButton, isOpen };
};

export default useOAHelperApp;
