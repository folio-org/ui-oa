import { useCallback, useEffect, useState } from 'react';
import useActiveElement from './useActiveElement';

const useTypedownToggle = () => {
  const [open, setOpen] = useState(false);
  const onToggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const focusedElement = useActiveElement();

  // Trawl up element stack and check if a typedown-parent exists, use that to toggle
  const openBool = !open && focusedElement.closest('[id^=typedown-parent]') !== null;
  const closeBool = open && focusedElement.closest('[id^=typedown-parent]') === null;

  useEffect(() => {
    if (openBool || closeBool) {
      onToggle();
    }
  }, [closeBool, onToggle, openBool, focusedElement]);

  return { open, onToggle };
};

export default useTypedownToggle;
