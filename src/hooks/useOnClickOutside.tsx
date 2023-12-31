import React, { useEffect } from 'react';

export default function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  handler: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref?.current.contains(event?.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
