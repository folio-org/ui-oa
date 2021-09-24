import React, { useMemo, useRef, useState } from 'react';

import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { Button, Dropdown, DropdownMenu } from '@folio/stripes/components';

import SearchField from './SearchField';
import css from './TypeDown.css';

const TypeDown = ({ input, meta, path, pathMutator }) => {


  const ky = useOkapiKy();

  const [callPath, setCallPath] = useState(path);
  const [value, setValue] = useState();

  const { data } = useQuery(
    // Ensure when multiple apps are using this function that each one gets memoized individually
    ['stripes-kint-components', 'typedown', callPath],
    () => ky(callPath).json()
  );


  const handleChange = (e) => {
    setCallPath(pathMutator(e.target.value, path));
  };

  const [searchWidth, setSearchWidth] = useState('100%');
  const menu = () => (
    <DropdownMenu
      overrideStyle={{ padding: 0 }}
    >
      {data?.map(d => {
        return (
          <div style={{ width: searchWidth }}>
            <Button
              buttonClass={css.menuButton}
            >
              Hello
            </Button>
          </div>
        );
      })}
    </DropdownMenu>
  );

  return (
    <>
      <input
        {...input}
        type="hidden"
        value={value}
      />
      <Dropdown
        key="typedown-menu-toggle"
        className={css.fullWidth}
        hasPadding
        renderMenu={menu}
        renderTrigger={({ onToggle, triggerRef }) => {
          setSearchWidth(`${triggerRef.current?.offsetWidth}px`);
          return (
            <div
              ref={triggerRef}
              onBlur={() => onToggle()}
              onFocus={() => onToggle()}
            >
              <SearchField
                onChange={handleChange}
              />
            </div>
          );
        }}
      />
    </>
  );
};

export default TypeDown;
