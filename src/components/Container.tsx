import React from 'react';

const Container = ({
  onScroll,
  children,
}: {
  onScroll?: (e: any) => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      onScroll={(e) => onScroll && onScroll(e)}
      className='flex-grow pb-[85px] bg-gray-bg border-t border-gray-font overflow-y-scroll scrollbar-hide'
    >
      {children}
    </div>
  );
};

export default Container;
