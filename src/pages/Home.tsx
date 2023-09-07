import Post from 'components/Post';
import { useState } from 'react';

const Home = () => {
  const query: string | null = localStorage.getItem('Headline');
  const [fq, setFq] = useState<string>(``);

  return (
    <>
      <Post query={query ? query : ''} filter={fq} />
    </>
  );
};

export default Home;
