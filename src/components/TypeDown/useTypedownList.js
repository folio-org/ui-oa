
import { UP_ARROW, DOWN_ARROW, TAB } from './constants/eventCodes';
import {
  getNextFocusable,
  getPreviousFocusable,
} from './getFocusableElements';

const useTypedownList = (listRef, footerRef, searchField) => {
  return e => {
    if (e.code === DOWN_ARROW) {
      const elem = getNextFocusable(listRef.current, true, true);
      elem.focus();
    }

    if (e.code === UP_ARROW) {
      const elem = getPreviousFocusable(listRef.current, true, true);
      elem.focus();
    }

    if (e.code === TAB) {
      e.preventDefault();
      let elem;
      if (e.shiftKey) {
        elem = getNextFocusable(footerRef.current, true, true);
      } else {
        elem = searchField;
      }
      elem.focus();
    }
  };
};

export default useTypedownList;
