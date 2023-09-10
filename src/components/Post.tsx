import { useQuery } from '@tanstack/react-query';
import { getPost } from 'api/getPost';
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
import { useGetInfinitePost, useGetPost } from 'hooks/useGetPost';

const Post = ({
  currentPage,
  handleChangePage,
}: {
  currentPage: 'Home' | 'Scrape';
  handleChangePage: (value: string) => void;
}) => {
  const [scrapeList, setScrapeList] = useState<string[]>([]);
  let initFilter: filterProps | null | undefined = getFilter(currentPage);

  const [filter, setFilter] = useState(initFilter);
  /* 
  const { status, data, error } = useGetPost(
    filter?.q,
    filter?.period,
    filter?.glocations
  );
 */
  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfinitePost(filter?.q, filter?.period, filter?.glocations);
  console.log('🚀 ~ file: Post.tsx:35 ~ data:', data);

  let fetching = false;

  const handleScroll = async (e: any) => {
    console.log('🚀 ~ file: Post.tsx:61 ~ handleScroll ~ e:', e);
    const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
    if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
      fetching = true;
      if (hasNextPage) await fetchNextPage();
      fetching = false;
    }
  };

  useEffect(() => {
    let isScrape = localStorage.getItem('scrapeList');
    if (!isScrape) {
      localStorage.setItem('scrapeList', JSON.stringify([]));
      isScrape = localStorage.getItem('scrapeList');
    }
    isScrape && setScrapeList(JSON.parse(isScrape));

    const updatedFilter = getFilter(currentPage);
    if (filter !== initFilter) return setFilter(updatedFilter);

    /* infiniteScroll */
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

    localStorage.setItem('scrapeList', JSON.stringify(updatedList));
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
            <div onClick={() => handleChangePage('홈')} className='w-full px-5'>
              <Button value='스크랩 하러 가기' />
            </div>
          </div>
        </div>
      </Container>
    );

  if (!data)
    return (
      <Container>
        <div className='w-full h-full p-5 flex-grow flex justify-center items-center'>
          <p className='text-black-80'>검색 결과를 찾을 수 없습니다.</p>
        </div>
      </Container>
    );

  return (
    <>
      <Container onScroll={handleScroll}>
        <div className='flex justify-center items-center'>
          <ul className='w-full h-full flex flex-col gap-2 p-5 flex-grow'>
            {status === 'success' &&
              data.pages.map((page) =>
                page.map((post: any) => (
                  <>
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
                  </>
                ))
              )}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Post;
