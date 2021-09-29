import React, { useCallback, useEffect, useState } from 'react';

import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { Button, Dropdown, DropdownMenu } from '@folio/stripes/components';

import SearchField from './SearchField';
import css from './TypeDown.css';

const TypeDown = ({ input, meta, path, pathMutator }) => {
  const ky = useOkapiKy();

  const [callPath, setCallPath] = useState(path);

  const { data } = useQuery(
    // Ensure when multiple apps are using this function that each one gets memoized individually
    ['stripes-kint-components', 'typedown', callPath],
    () => ky(callPath).json()
  );

  const handleChange = (e) => {
    setCallPath(pathMutator(e.target.value, path));
  };

  const [searchWidth, setSearchWidth] = useState('100%');

  const menu = ({ onToggle }) => {
    return (
      <DropdownMenu
        overrideStyle={{ padding: 0 }}
      >
        <div
          style={{ width: searchWidth }}
        >
          {data?.map(d => {
            return (
              <Button
                buttonClass={css.menuButton}
                fullWidth
                onClick={() => {
                  onToggle();
                  input.onChange(d);
                }}
              >
                Hello
              </Button>
            );
          })}
        </div>
      </DropdownMenu>
    );
  };

  return (
    <>
      <input
        {...input}
        type="hidden"
      />
      <Dropdown
        key="typedown-menu-toggle"
        className={css.fullWidth}
        hasPadding
        renderMenu={menu}
        renderTrigger={({ onToggle, open, triggerRef }) => {
          setSearchWidth(`${triggerRef.current?.offsetWidth}px`);
          return (
            <div
              ref={triggerRef}
              onFocus={() => {
                onToggle();
              }}
            >
              <SearchField
                onChange={handleChange}
              />
            </div>
          );
        }}
        usePortal
      />
    </>
  );
};

export default TypeDown;
