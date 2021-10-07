
import { UP_ARROW, DOWN_ARROW, TAB } from './constants/eventCodes';
import {
  getNextFocusable,
  getFirstFocusable,
  getLastFocusable
} from './getFocusableElements';

const useTypedownSearchField = (listRef, footerRef, focusRef) => {
  return e => {
    if (e.code === UP_ARROW) {
      const elem = getLastFocusable(listRef.current, true, true);
      if (elem) {
        elem.focus();
      }
    }

    if (e.code === DOWN_ARROW) {
      const elem = getFirstFocusable(listRef.current, true, true);
      if (elem) {
        elem.focus();
      }
    }

    // Tab key (But not while shifting)
    if (e.code === TAB && !e.shiftKey) {
      e.preventDefault();
      // If we have focusable elements in the footer, then focus on them, else unfocus searchbar
      const elem = getNextFocusable(footerRef.current, true, true, true, true);
      if (elem) {
        elem.focus();
      } else {
        focusRef.current.focus();
      }
    }
  };
};

export default useTypedownSearchField;
