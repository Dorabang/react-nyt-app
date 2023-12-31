import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex-grow pb-[85px] bg-gray-bg border-t border-gray-font overflow-y-scroll scrollbar-hide'>
      {children}
    </div>
  );
};

export default Container;
