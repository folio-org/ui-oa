import { useEffect, useRef } from 'react';

import {
  getNextFocusable,
  getPreviousFocusable,
} from '../getFocusableElements';
import { TAB } from '../constants/eventCodes';

const useTypedownFooter = (endOfListRef, searchField) => {
  const footerRef = useRef();

  const footer = document.getElementById('typedown-footer');
  // Add an event listener to the footer, so that we can control tab behaviour between footer elements
  useEffect(() => {
    if (footer) {
      footer.addEventListener('keydown', e => {
        e.preventDefault();
        let elem = null;
        let direction;

        if (!e.shiftKey && e.code === TAB) {
          elem = getNextFocusable(footerRef.current, true, true, false, true);
          direction = 'forwards';
        } else if (e.shiftKey && e.code === TAB) {
          elem = getPreviousFocusable(footerRef.current, true, true, false, true);
          direction = 'backwards';
        }

        if (elem) {
          // Focus on next focusable element
          elem.focus();
        } else if (direction === 'forwards') {
          // We are at the end of the list, move onto unfocus div
          endOfListRef.current.focus();
        } else if (direction === 'backwards') {
          // We are at the beginning of the list, refocus on search bar
          searchField.focus();
        }
      });
    }
  }, [endOfListRef, footer, searchField]);

  return footerRef;
};

export default useTypedownFooter;
