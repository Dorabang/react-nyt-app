import React from 'react';

const Button = ({ value }: { value: string }) => {
  return (
    <button
      className='w-full py-[18px] text-center text-white rounded-2xl
  bg-main-blue hover:bg-opacity-90 transition-colors
  cursor-pointer'
    >
      {value}
    </button>
  );
};

export default Button;
