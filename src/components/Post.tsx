import { useQuery } from '@tanstack/react-query';
import { getPost } from 'api/getPost';
import Container from 'components/Container';
import Loading from './Loading';
import Error from './Error';
import Star from 'assets/inactive/star.png';
import DateFormat from 'libs/DateFormat';

const Post = ({ query, filter = '' }: { query: string; filter?: string }) => {
  const { isLoading, data, error } = useQuery<any[] | undefined>({
    queryKey: ['post'],
    queryFn: () => getPost(query, filter),
  });

  if (error instanceof Error) {
    return <Error error={error} />;
  }

  if (isLoading) return <Loading />;

  return (
    <Container>
      <ul className='w-full h-full flex flex-col gap-2 p-5 overflow-y-scroll scrollbar-hide'>
        {data &&
          data.map((post: any) => {
            console.log('🚀 ~ file: Post.tsx:24 ~ Post ~ post:', post);
            return (
              <li
                key={post._id}
                className='w-full bg-white rounded-lg px-5 py-[10px] cursor-pointer'
              >
                {/* title */}
                <div className='flex justify-between'>
                  <div className='w-[260px] h-14'>
                    <p className='font-semibold text-lg'>
                      {post.headline.main.length > 40
                        ? post.headline.main.substring(0, 40) + '...'
                        : post.headline.main}
                    </p>
                  </div>
                  <div className='w-6 h-6 flex justify-center items-center cursor-pointer'>
                    <img src={Star} alt='스크랩 저장 버튼 아이콘' />
                  </div>
                </div>

                {/* author & date */}
                <div className='flex justify-between pt-2 text-[13px] leading-5 '>
                  <p>
                    <span className='pr-2'>
                      {post.source.length > 15
                        ? post.source.substring(0, 7) + '...'
                        : post.source}
                    </span>
                    <span>
                      {post.byline.original.length > 2
                        ? post.byline.original.substring(3)
                        : post.byline.original}
                    </span>
                  </p>
                  <p className='text-black-80'>{DateFormat(post.pub_date)}</p>
                </div>
              </li>
            );
          })}
      </ul>
    </Container>
  );
};

export default Post;
