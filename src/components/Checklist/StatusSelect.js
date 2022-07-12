import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  IconButton,
   DropdownMenu,
  Button,
  Icon,
  nativeChangeFieldValue as nativeChangeField,
} from '@folio/stripes/components';
import css from './StatusSelect.css';

const propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  meta: PropTypes.object,
  input: PropTypes.object,
  onChange: PropTypes.func,
};

const StatusSelect = ({
  options,
  meta,
  input: formInput = {},
  onChange,
}) => {
  const hiddenInput = useRef(null);

  const [value, setValue] = useState(meta?.initial ?? '');

  const handleChange = (e) => {
    // Actually set the value in the form
    formInput.onChange(e);

    // If the user has set up an onChange, this will ensure that that fires
    if (onChange) {
      onChange(e, e.target.value);
    }
  };

  const renderMenu = ({ onToggle }) => (
    <DropdownMenu>
      {options.map((opt) => {
        return (
          <Button
            buttonStyle="dropdownItem"
            marginBottom0
            onClick={() => {
              // Trigger change event
              nativeChangeField(hiddenInput, false, opt.value);

              // Set internal states
              setValue(opt.value);

              // Close the menu on select
              onToggle();
            }}
          >
            {opt.icon ? (
              <Icon icon={opt.icon} {...opt.iconProps}>
                {opt.label}
              </Icon>
            ) : (
              opt.label
            )}
          </Button>
        );
      })}
    </DropdownMenu>
  );

  return (
    <>
      <Dropdown
        hasPadding
        placement="bottom-start"
        renderMenu={renderMenu}
        renderTrigger={({
          open,
          onToggle,
          triggerRef,
          keyHandler,
          ariaProps,
          getTriggerProps,
        }) => (
          <IconButton
            ref={triggerRef}
            className={css.buttonStyle}
            icon={open ? 'caret-up' : 'caret-down'}
            marginBottom0
            onClick={onToggle}
            onKeyDown={keyHandler}
            type="button"
            {...getTriggerProps()}
            {...ariaProps}
          />
        )}
      />
      <input
        ref={hiddenInput}
        hidden
        onChange={handleChange}
        type="text"
        value={value}
      />
    </>
  );
};

StatusSelect.propTypes = propTypes;

export default StatusSelect;
