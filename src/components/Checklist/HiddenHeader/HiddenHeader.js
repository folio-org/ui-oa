import React from 'react';
import PropTypes from 'prop-types';
import { Headline, Icon } from '@folio/stripes/components';
import css from './HiddenHeader.css';

const propTypes = {
  autoFocus: PropTypes.bool,
  contentId: PropTypes.string,
  displayWhenClosed: PropTypes.element,
  displayWhenOpen: PropTypes.element,
  headerProps: PropTypes.object,
  headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
  toggleRef: PropTypes.func,
};

// TODO This will need to be changed in the future
// The accordion component does not allow styling changes to only header so an entirely new header needs to be created
// This accordion header is a copy of the default accordion header with slight styling changes

const HiddenHeader = ({
  autoFocus,
  contentId,
  displayWhenClosed,
  displayWhenOpen,
  headerProps: { headingLevel = 3, ...restHeaderProps } = { headingLevel: 3 },
  id,
  label,
  onToggle,
  open,
  toggleRef,
}) => {
  function handleHeaderClick(e) {
    onToggle({ id, label });
    e.stopPropagation();
  }

  function handleKeyPress(e) {
    e.preventDefault();
    if (e.charCode === 13) {
      // enter key
      onToggle({ id, label });
    }
  }

  // Content in the right side of the header
  let headerRight = null;
  const headerRightContent = open ? displayWhenOpen : displayWhenClosed;
  if (headerRightContent) {
    headerRight = (
      <div className={css.headerDefaultContentRight}>{headerRightContent}</div>
    );
  }

  return (
    <div className={css.headerWrapper}>
      <div className={`${css.header} ${css.default}`}>
        <Headline
          block
          margin="none"
          size="medium"
          tag={headingLevel ? `h${headingLevel}` : 'div'}
        >
          <button
            ref={toggleRef}
            aria-controls={contentId}
            aria-expanded={open}
            autoFocus={autoFocus}
            className={css.defaultCollapseButton}
            id={`accordion-toggle-button-${id}`}
            onClick={handleHeaderClick}
            onKeyPress={handleKeyPress}
            type="button"
            {...restHeaderProps}
          >
            <span className={css.headerInner}>
              <span className={css.defaultHeaderIcon}>
                <Icon
                  icon={open ? 'caret-up' : 'caret-down'}
                  size="small"
                />
              </span>
              <div className={css.labelArea}>{label}</div>
            </span>
          </button>
        </Headline>
      </div>
      {headerRight}
    </div>
  );
};

HiddenHeader.propTypes = propTypes;

export default HiddenHeader;
