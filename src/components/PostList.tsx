import activeStar from 'assets/active/star-fill.png';
import Star from 'assets/inactive/star.png';
import DateFormat from 'libs/DateFormat';

export interface PostListProps {
  post: any;
  scrapeList: string[];
  handleClickStar: (id: string) => void;
}

const PostList = ({ post, scrapeList, handleClickStar }: PostListProps) => {
  return (
    <li key={post._id} className='w-full bg-white rounded-lg px-5 py-[10px]'>
      {/* title */}
      <div className='flex justify-between'>
        <div className='w-[260px] h-14'>
          <a href={post.web_url}>
            <p className='font-semibold text-lg'>
              {post.headline.main.length > 40
                ? post.headline.main.substring(0, 40) + '...'
                : post.headline.main}
            </p>
          </a>
        </div>
        <div
          className='w-6 h-6 flex justify-center items-center cursor-pointer'
          onClick={() => handleClickStar(post._id)}
        >
          {scrapeList.includes(post._id) ? (
            <img src={activeStar} alt='스크랩 저장 버튼 아이콘' />
          ) : (
            <img src={Star} alt='스크랩 저장 버튼 아이콘' />
          )}
        </div>
      </div>

      {/* author & date */}
      <div className='flex justify-between pt-2 text-[13px] leading-5 '>
        <p>
          <span className='pr-2'>
            {post.source && post.source.length > 15
              ? post.source.substring(0, 7) + '...'
              : post.source}
          </span>
          <span>
            {post.byline.original && post.byline.original.length > 2
              ? post.byline.original.length > 10
                ? post.byline.original.substring(3, 15) + '...'
                : post.byline.original.substring(3)
              : post.byline.original || ''}
          </span>
        </p>
        <p className='text-black-80'>{DateFormat(post.pub_date)}</p>
      </div>
    </li>
  );
};

export default PostList;
