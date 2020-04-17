import * as React from 'react';
import { extract } from 'query-string';
import shallowEqual from './shallowEqual';

export function usePreviousIfShallowEqual<T>(value: T) {
  const ref = React.useRef(value);
  const hasNew = !shallowEqual(ref.current, value);
  React.useEffect(() => {
    if (hasNew) {
      ref.current = value;
    }
  }, [value, hasNew]);
  return hasNew ? value : ref.current;
}

export function getSSRSafeSearchString(location: Location | undefined) {
  // handle checking SSR (#13)
  if (typeof location === 'object') {
    // in browser
    if (typeof window !== 'undefined') {
      return location.search;
    } else {
      return extract(
        `${location.pathname}${location.search ? location.search : ''}`
      );
    }
  }

  return '';
}
