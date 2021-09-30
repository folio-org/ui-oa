import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { useQuery } from 'react-query';
import get from 'lodash/get';
import { useResizeDetector } from 'react-resize-detector';

import { useOkapiKy } from '@folio/stripes/core';
import { Dropdown, DropdownMenu } from '@folio/stripes/components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { interactionStyles } from '@folio/stripes-components/lib/sharedStyles/interactionStyles.css';

import SearchField from './SearchField';
import css from './TypeDown.css';

import useTypedownToggle from './useTypedownToggle';
import { first } from 'lodash';

const TypeDown = ({
  input,
  path,
  pathMutator,
  renderListItem = null,
  uniqueIdentificationPath = 'id'
}) => {
  const ky = useOkapiKy();
  const selectedUniqueId = get(input.value, uniqueIdentificationPath);

  const [callPath, setCallPath] = useState(pathMutator(null, path));

  const { data } = useQuery(
    // Ensure when multiple apps are using this function that each one gets memoized individually
    ['stripes-kint-components', 'typedown', callPath],
    () => ky(callPath).json()
  );

  const { open, onToggle } = useTypedownToggle();

  const handleChange = (e) => {
    setCallPath(pathMutator(e.target.value, path));
  };

  // useResizeDetector fires redraw on size change to keep all elements in sync
  const { width: searchWidth, ref: resizeRef } = useResizeDetector();

  const focusRef = useRef();

  const renderItem = useCallback((option) => (
    <div
      className={css.listItem}
    >
      {renderListItem ?
        renderListItem(option) :
        get(option, uniqueIdentificationPath)
      }
    </div>
  ), [renderListItem, uniqueIdentificationPath]);

  const firstItem = useRef();
  const lastItem = useRef();

  const menu = useCallback(() => {
    return (
      <DropdownMenu
        id="typedown-parent-menu"
        overrideStyle={{
          padding: 0,
          'margin-top': 0,
          'max-width': searchWidth,
          'min-width': searchWidth,
          overflow: 'hidden'
        }}
      >
        {data?.map((d, index) => {
          const isSelected = get(input.value, uniqueIdentificationPath) === get(d, uniqueIdentificationPath)
          let itemRef = null;
          if (index === 0) {
            itemRef = firstItem;
          } else if (index === data.length - 1) {
            itemRef = lastItem;
          }

          return (
            <button
              key={`typedown-button-[${index}]`}
              ref={itemRef}
              className={classnames(
                interactionStyles,
                css.fullWidth,
                css.menuButton,
                isSelected ? css.selected : ''
              )}
              id={`typedown-button-[${index}]`}
              onClick={() => {
                input.onChange(d);
                focusRef.current.focus();
              }}
              type="button"
            >
              {renderItem(d)}
            </button>
          );
        })}
      </DropdownMenu>
    );
  }, [
    data,
    input,
    renderItem,
    searchWidth,
    uniqueIdentificationPath
  ]);

  return (
    <div
      ref={resizeRef}
    >
      <input
        {...input}
        type="hidden"
      />
      <Dropdown
        key="typedown-menu-toggle"
        className={classnames(
          css.dropdown,
          css.fullWidth
        )}
        hasPadding
        id="typedown-parent-dropdown"
        onToggle={onToggle}
        open={open}
        renderMenu={menu}
        renderTrigger={({ triggerRef }) => {
          return (
            <div
              ref={triggerRef}
            >
              <SearchField
                id="typedown-searchField"
                marginBottom0
                onChange={handleChange}
                onKeyDown={e => {
                  // Up arrow
                  if (e.keyCode === 38) {
                    lastItem.current.focus();
                  }

                  // Down arrow
                  if (e.keyCode === 40) {
                    firstItem.current.focus();
                  }
                }}
              />
            </div>
          );
        }}
        usePortal
      />
      {selectedUniqueId && !open &&
        <div
          className={classnames(
            css.selected,
            css.selectedDisplay
          )}
        >
          {renderItem(input.value)}
        </div>
      }
      {/* Hidden div to give focus to on button click and close menu */}
      <div
        ref={focusRef}
        id="typedown-lose-focus"
        tabIndex={-1}
      />
    </div>
  );
};

TypeDown.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  path: PropTypes.string,
  pathMutator: PropTypes.func,
  renderListItem: PropTypes.func,
  uniqueIdentificationPath: PropTypes.string
};

export default TypeDown;
