import { useCallback, useEffect, useState } from 'react';
import useActiveElement from './useActiveElement';

const useTypedownToggle = () => {
  const [open, setOpen] = useState(false);
  const onToggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const regexp = /typedown-button-\[\d+\]/;

  const focusedElement = useActiveElement();
  const openBool = !open && (focusedElement.id === 'typedown-searchField' || regexp.test(focusedElement.id));
  const closeBool = open && focusedElement.id !== 'typedown-searchField' && !regexp.test(focusedElement.id);

  useEffect(() => {
    if (openBool || closeBool) {
      onToggle();
    }
  }, [closeBool, onToggle, openBool, focusedElement]);

  return { open, onToggle };
};

export default useTypedownToggle;
