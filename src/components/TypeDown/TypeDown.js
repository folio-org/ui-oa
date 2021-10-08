import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import get from 'lodash/get';
import { useResizeDetector } from 'react-resize-detector';

import { EmptyMessage, Popper } from '@folio/stripes/components';

// eslint-disable-next-line import/no-extraneous-dependencies
import { interactionStyles } from '@folio/stripes-components/lib/sharedStyles/interactionStyles.css';

import SearchField from './SearchField';
import css from './TypeDown.css';

import { useTypedown, useTypedownData } from './typedownHooks';

const TypeDown = ({
  input,
  path,
  pathMutator,
  renderFooter = null,
  renderListItem = null,
  uniqueIdentificationPath = 'id'
}) => {
  const selectedUniqueId = get(input.value, uniqueIdentificationPath);

  const [callPath, setCallPath] = useState(pathMutator(null, path));
  const data = useTypedownData(callPath);

  // useResizeDetector fires redraw on size change to keep all elements in sync
  const { width: searchWidth, ref: resizeRef } = useResizeDetector();

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

  const portal = document.getElementById('OverlayContainer');
  // Hook to set up all the essentials
  const {
    refs: {
      focusRef,
      listRef,
      triggerRef,
      overlayRef,
      footerRef
    },
    handlers: {
      searchFieldKeyDownHandler,
      listKeyDownHandler
    },
    variables: {
      open
    }
  } = useTypedown();

  const dropDown = useCallback(() => {
    return (
      <div
        className={css.dropdownMenu}
        id="typedown-parent-menu"
        style={{ '--searchWidth': `${searchWidth}px` }}
      >
        <div
          ref={listRef}
          id="typedown-list"
        >
          {data?.length ? data?.map((d, index) => {
            const isSelected = get(input.value, uniqueIdentificationPath) === get(d, uniqueIdentificationPath);
            return (
              <button
                key={`typedown-button-[${index}]`}
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
                onKeyDown={listKeyDownHandler}
                type="button"
              >
                {renderItem(d)}
              </button>
            );
          }) :
          <EmptyMessage>
            NOWT
          </EmptyMessage>
          }
        </div>
        <div
          ref={footerRef}
          id="typedown-footer"
        >
          {renderFooter ? renderFooter() : null}
        </div>
      </div>
    );
  }, [
    data,
    focusRef,
    footerRef,
    input,
    listKeyDownHandler,
    listRef,
    renderFooter,
    renderItem,
    searchWidth,
    uniqueIdentificationPath
  ]);

  const renderSearchField = () => {
    return (
      <div
        ref={triggerRef}
        id="typedown-parent-searchField"
      >
        <SearchField
          id="typedown-searchField"
          marginBottom0
          onChange={e => {
            setCallPath(pathMutator(e.target.value, path));
          }}
          onKeyDown={searchFieldKeyDownHandler}
        />
      </div>
    );
  };

  return (
    <div
      ref={resizeRef}
    >
      <input
        {...input}
        type="hidden"
      />
      {renderSearchField()}
      <Popper
        key="typedown-menu-toggle"
        anchorRef={triggerRef}
        className={classnames(
          css.dropdown,
          css.fullWidth
        )}
        isOpen={open}
        modifiers={{
          flip: { boundariesElement: 'viewport', padding: 10 },
          preventOverflow: { boundariesElement: 'viewport', padding: 10 }
        }}
        overlayProps={{
          'ref': overlayRef,
          'tabIndex': '-1',
          'onClick': (e) => { e.stopPropagation(); }  // prevent propagation of click events
        }}
        overlayRef={overlayRef}
        portal={portal}
      >
        {dropDown()}
      </Popper>
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
  renderFooter: PropTypes.func,
  renderListItem: PropTypes.func,
  uniqueIdentificationPath: PropTypes.string
};

export default TypeDown;
