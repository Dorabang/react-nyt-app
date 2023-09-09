import { useQuery } from '@tanstack/react-query';
import { getPost } from 'api/getPost';
import Container from 'components/Container';
import Loading from './Loading';
import Error from './Error';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getFilter from 'libs/getFilter';
import { filterProps } from './FilterModal';
import PostList from './PostList';
import ScrapePost from './ScrapePost';

const Post = ({ currentPage }: { currentPage: 'Home' | 'Scrape' }) => {
  const [scrapeList, setScrapeList] = useState<string[]>([]);

  const filter: filterProps | null | undefined = getFilter(currentPage);

  const query = filter?.q ? filter?.q : '';
  const period = filter?.period ? filter?.period : '';
  const country = filter?.glocations ? filter?.glocations : '';

  const { status, data, error } = useQuery<any[] | undefined>({
    queryKey: ['post'],
    queryFn: () =>
      getPost(query, `pub_date=("${period}")`, `glocations=("${country}")`),
    staleTime: 2000,
  });
  console.log('🚀 ~ file: Post.tsx:27 ~ Post ~ data:', data);

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

  useEffect(() => {
    let isScrape = localStorage.getItem('scrapeList');
    if (!isScrape) {
      localStorage.setItem('scrapeList', JSON.stringify([]));
      isScrape = localStorage.getItem('scrapeList');
    }
    isScrape && setScrapeList(JSON.parse(isScrape));
  }, []);

  if (status === 'error') return <Error error={error} />;

  if (status === 'loading') return <Loading />;

  return (
    <>
      <Container>
        <ul className='w-full h-full flex flex-col gap-2 p-5 flex-grow'>
          {data &&
            data.map((post: any) => (
              <li
                key={post._id}
                className='w-full bg-white rounded-lg px-5 py-[10px]'
              >
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
              </li>
            ))}
        </ul>
      </Container>
    </>
  );
};

export default Post;
