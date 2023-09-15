import { useGetFilteredPost } from 'hooks/useGetPost';
import { useRecoilValue } from 'recoil';
import { currentPageState, paginationState } from 'recoil/atom';
import Post from './Post';

const FilteredPost = () => {
  const CurrentPage = useRecoilValue(currentPageState);
  const page = useRecoilValue(paginationState);

  const { data, status, error, hasNextPage, fetchNextPage } =
    useGetFilteredPost(CurrentPage, page);

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

export default FilteredPost;
