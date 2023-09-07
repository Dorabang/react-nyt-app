import React from 'react';
import Container from './Container';

const Loading = () => {
  return (
    <Container>
      <div className='h-full p-5'>
        <div className='bg-white rounded-lg px-5 py-[10px] animate-pulse'>
          <div className='w-[260px] h-14'>
            <div className='w-full h-[18px] bg-white-60 animate-pulse rounded'></div>
          </div>

          <div className='flex justify-between'>
            <div className='flex'>
              <div className='w-8 h-[14px] bg-white-60 animate-pulse rounded mr-2'></div>
              <div className='w-8 h-[14px] bg-white-60 animate-pulse rounded'></div>
            </div>
            <div className='w-12 h-[14px] bg-white-60 animate-pulse rounded'></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
