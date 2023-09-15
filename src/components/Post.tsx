import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import inactiveScrapeIcon from 'assets/inactive/inactiveScrape_Icon.png';
import { getItem, setItem } from 'libs/getStorageData';
import { useInView } from 'react-intersection-observer';
import { useRecoilState } from 'recoil';
import { currentPageState, paginationState } from 'recoil/atom';

/* components */
import ScrapePost from 'components/ScrapePost';
import PostList from 'components/PostList';
import Button from 'components/Button';
import Container from 'components/Container';
import Loading from 'components/Loading';
import Error from 'components/Error';
import { FetchNextPageOptions, InfiniteData } from '@tanstack/react-query';

const Post = ({
  data,
  status,
  error,
  hasNextPage,
  fetchNextPage,
}: {
  data: InfiniteData<any> | undefined;
  status: 'error' | 'loading' | 'success';
  error: unknown;
  hasNextPage: boolean | undefined;
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<any>;
}) => {
  let isScrape = getItem('scrapeList');
  const [scrapeList, setScrapeList] = useState<string[]>(isScrape);
  const [page, setPage] = useRecoilState(paginationState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  console.log('data', data);

  const posts = useMemo(
    () =>
      data
        ? data.pages.flatMap(({ docs }, idx) => (idx !== 1 ? docs : []))
        : [],
    [data]
  );
  console.log('🚀 ~ file: Post.tsx:44 ~ posts:', posts);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (isScrape === null) {
      setItem('scrapeList', []);
      setScrapeList(isScrape);
    }
  }, [isScrape]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
      setPage(page + 1);
    }
  }, [inView, hasNextPage]);

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

  if (status === 'error') return <Error error={error} />;

  if (status === 'loading') return <Loading />;

  if (currentPage === 'Scrape' && scrapeList.length === 0)
    return (
      <Container>
        <div className='w-full h-full p-5 flex-grow flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='w-9 h-9'>
              <img src={inactiveScrapeIcon} alt='스크랩 아이콘' />
            </div>
            <p className='pt-2 pb-5 text-black-80'>저장된 스크랩이 없습니다.</p>
            <div onClick={() => setCurrentPage('Home')} className='w-full px-5'>
              <Button value='스크랩 하러 가기' />
            </div>
          </div>
        </div>
      </Container>
    );

  if (data && !data.pages[0].docs)
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
            {posts.map((post: any) => (
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
              </React.Fragment>
            ))}
            <div ref={ref}></div>
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Post;
