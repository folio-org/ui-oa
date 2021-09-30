import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { useQuery } from 'react-query';
import get from 'lodash/get';

import { useOkapiKy } from '@folio/stripes/core';
import { Dropdown, DropdownMenu } from '@folio/stripes/components';

import SearchField from './SearchField';
import css from './TypeDown.css';

import useTypedownToggle from './useTypedownToggle';

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

  const [searchWidth, setSearchWidth] = useState('100%');
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

  const menu = useCallback(() => {
    return (
      <DropdownMenu
        overrideStyle={{ padding: 0 }}
      >
        <div
          style={{ width: searchWidth }}
        >
          {data?.map((d, index) => {
            const isSelected = get(input.value, uniqueIdentificationPath) === get(d, uniqueIdentificationPath)
            return (
              <button
                key={`typedown-button-[${index}]`}
                className={classnames(
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
        </div>
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
    <>
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
        onToggle={onToggle}
        open={open}
        renderMenu={menu}
        renderTrigger={({ triggerRef }) => {
          setSearchWidth(`${triggerRef.current?.offsetWidth}px`);
          return (
            <div
              ref={triggerRef}
            >
              <SearchField
                id="typedown-searchField"
                marginBottom0
                onChange={handleChange}
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
          style={{ width: searchWidth }}
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
    </>
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
