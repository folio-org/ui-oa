import { useEffect, useState } from 'react';


const useActiveElement = () => {
  const [active, setActive] = useState(document.activeElement);

  const handleFocusIn = () => {
    setActive(document.activeElement);
  };
  const hasParent = (id) => {
    return active.closest(`[id^=${id}]`) !== null;
  };

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
  };
  }, []);

  return { active, hasParent };
};

export default useActiveElement;
