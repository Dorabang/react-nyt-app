import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='border-t border-[#C4C4C4] bg-gray-bg h-full flex justify-center items-center'>
      {children}
    </div>
  );
};

export default Container;
