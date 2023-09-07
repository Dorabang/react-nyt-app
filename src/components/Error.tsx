import React from 'react';
import Container from './Container';

const Error = ({ error }: { error: any }) => {
  return (
    <Container>
      <div className='pb-5 m-5'>{error?.message}</div>
    </Container>
  );
};

export default Error;
