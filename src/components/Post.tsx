import React, { useMemo } from 'react';
import Container from 'components/Container';
import Loading from 'components/Loading';
import Error from 'components/Error';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getFilter from 'libs/getFilter';
import { filterProps } from 'components/FilterModal';
import PostList from 'components/PostList';
import ScrapePost from 'components/ScrapePost';
import inactiveScrapeIcon from 'assets/inactive/inactiveScrape_Icon.png';
import Button from 'components/Button';
import useIntersection from 'hooks/useIntersection';
import { useGetInfinitePost } from 'hooks/useGetPost';
import { getItem, setItem } from 'libs/getStorageData';
import { getPost } from 'api/getPost';

const Post = ({
  currentPage,
  handleChangePage,
}: {
  currentPage: 'Home' | 'Scrape';
  handleChangePage: (value: string) => void;
}) => {
  let isScrape = getItem('scrapeList');
  const [scrapeList, setScrapeList] = useState<string[]>(isScrape);
  const [page, setPage] = useState<number>(0);
  console.log('🚀 ~ file: Post.tsx:27 ~ page:', page);

  const initFilter: filterProps | null | undefined = getFilter(currentPage);

  const [filter, setFilter] = useState(initFilter);

  /* const { data, status, error } = useGetPost(
    filter?.q,
    filter?.period,
    filter?.glocations,
    page
  ); */

  const { hasNextPage, isFetching, fetchNextPage, ...result } =
    useGetInfinitePost(filter?.q, filter?.period, filter?.glocations, page);

  console.log('🚀 ~ file: Post.tsx:42 ~ result:', result.data);
  const posts = useMemo(
    () => (result.data ? result.data.pages.flatMap(({ docs }) => docs) : []),
    [result.data]
  );

  const ref = useIntersection((entry, observer) => {
    observer.unobserve(entry.target);

    setPage((prev) => prev + 1);
  });

  useEffect(() => {
    if (isScrape === null) {
      setItem('scrapeList', []);
      setScrapeList(isScrape);
    }

    if (filter !== initFilter) {
      const updatedFilter = getFilter(currentPage);
      return setFilter(updatedFilter);
    }
  }, []);

  const handleClickStar = (id: string) => {
    let updatedList;
    if (scrapeList.includes(id)) {
      updatedList = scrapeList.filter((list) => list !== id);
      toast.success('스크랩이 해제되었습니다.');
    } else {
      updatedList = [...scrapeList, id];
      toast.success('스크랩이 완료되었습니다.');
    }

    setItem('scrapeList', updatedList);
    setScrapeList(updatedList);
  };

  if (result.status === 'error') return <Error error={result.error} />;

  if (result.status === 'loading') return <Loading />;

  if (currentPage === 'Scrape' && scrapeList.length === 0)
    return (
      <Container>
        <div className='w-full h-full p-5 flex-grow flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='w-9 h-9'>
              <img src={inactiveScrapeIcon} alt='스크랩 아이콘' />
            </div>
            <p className='pt-2 pb-5 text-black-80'>저장된 스크랩이 없습니다.</p>
            <div onClick={() => handleChangePage('홈')} className='w-full px-5'>
              <Button value='스크랩 하러 가기' />
            </div>
          </div>
        </div>
      </Container>
    );

  if (!result.data)
    return (
      <Container>
        <div className='w-full h-full p-5 flex-grow flex justify-center items-center'>
          <p className='text-black-80'>검색 결과를 찾을 수 없습니다.</p>
        </div>
      </Container>
    );

  return (
    <>
      <Container>
        <div className='flex justify-center items-center'>
          <ul className='w-full h-full flex flex-col gap-2 p-5 flex-grow'>
            {result.status === 'success' &&
              posts.map((post: any) => (
                <React.Fragment key={post._id}>
                  {post && currentPage === 'Scrape' ? (
                    <ScrapePost
                      post={post}
                      scrapeList={scrapeList}
                      handleClickStar={handleClickStar}
                    />
                  ) : (
                    <PostList
                      post={post}
                      scrapeList={scrapeList}
                      handleClickStar={handleClickStar}
                    />
                  )}
                  <div ref={ref}></div>
                </React.Fragment>
              ))}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Post;
