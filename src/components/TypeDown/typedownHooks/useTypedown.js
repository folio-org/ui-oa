import { useRef } from 'react';
import {
  useTypedownToggle,
  useTypedownFooter,
  useTypedownSearchField,
  useTypedownList
} from '.';

const useTypedown = () => {
  // SEARCHFIELD COMPONENT
  const searchFieldComponent = document.getElementById('typedown-searchField');

  // SET UP REFS
  const focusRef = useRef();
  const listRef = useRef();
  const triggerRef = useRef();
  const overlayRef = useRef();
  const footerRef = useTypedownFooter(focusRef, searchFieldComponent);

  // SET UP HANDLERS
  const searchFieldKeyDownHandler = useTypedownSearchField(listRef, footerRef, focusRef);
  const listKeyDownHandler = useTypedownList(listRef, footerRef, searchFieldComponent);

  // SET UP VARIABLES
  const { open } = useTypedownToggle();

  return {
    refs: {
      focusRef,
      listRef,
      triggerRef,
      overlayRef,
      footerRef
    },
    handlers: {
      searchFieldKeyDownHandler,
      listKeyDownHandler
    },
    variables: {
      open
    }
  };
};

export default useTypedown;
