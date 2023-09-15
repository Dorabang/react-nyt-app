import { useGetDefaultPost } from 'hooks/useGetPost';
import { useRecoilValue } from 'recoil';
import { paginationState } from 'recoil/atom';
import Post from './Post';

const DefaultPost = () => {
  const page = useRecoilValue(paginationState);

  const { data, status, error, hasNextPage, fetchNextPage } =
    useGetDefaultPost(page);

  return (
    <>
      <Post
        data={data}
        status={status}
        error={error}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};

export default DefaultPost;
