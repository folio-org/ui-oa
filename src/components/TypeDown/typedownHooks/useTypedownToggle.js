import { useCallback, useEffect, useState } from 'react';
import useActiveElement from '../useActiveElement';

const useTypedownToggle = () => {
  const [open, setOpen] = useState(false);
  const onToggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const { hasParent } = useActiveElement();

  // Trawl up element stack and check if a typedown-parent exists, use that to toggle
  const openBool = !open && hasParent('typedown-parent');
  const closeBool = open && !hasParent('typedown-parent');

  useEffect(() => {
    if (openBool || closeBool) {
      onToggle();
    }
  }, [closeBool, onToggle, openBool]);

  return { open, onToggle };
};

export default useTypedownToggle;
