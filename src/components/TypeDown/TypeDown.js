import React, { useCallback, useRef, useState } from 'react';

import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { Button, Dropdown, DropdownMenu } from '@folio/stripes/components';

import SearchField from './SearchField';
import css from './TypeDown.css';

import useTypedownToggle from './useTypedownToggle';

const TypeDown = ({ input, meta, path, pathMutator }) => {
  const ky = useOkapiKy();

  const [callPath, setCallPath] = useState(path);

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

  const menu = useCallback(() => {
    return (
      <DropdownMenu
        overrideStyle={{ padding: 0 }}
      >
        <div
          style={{ width: searchWidth }}
        >
          {data?.map((d, index) => {
            return (
              <Button
                key={`typedown-button-[${index}]`}
                buttonClass={css.menuButton}
                fullWidth
                id={`typedown-button-[${index}]`}
                onClick={() => {
                  input.onChange(d);
                  focusRef.current.focus();
                }}
              >
                Hello
              </Button>
            );
          })}
        </div>
      </DropdownMenu>
    );
  }, [data, input, searchWidth]);

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
                onChange={handleChange}
              />
            </div>
          );
        }}
        usePortal
      />
      {/* Hidden div to give focus to on button click and close menu */}
      <div
        ref={focusRef}
        id="typedown-lose-focus"
        tabIndex={-1}
      />
    </>
  );
};

export default TypeDown;
