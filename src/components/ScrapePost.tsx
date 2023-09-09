import React from 'react';
import PostList, { PostListProps } from './PostList';

const ScrapePost = ({ post, scrapeList, handleClickStar }: PostListProps) => {
  return (
    <>
      {scrapeList.length !== 0 ? (
        post._id === scrapeList.find((scrape) => scrape === post._id) && (
          <PostList
            post={post}
            scrapeList={scrapeList}
            handleClickStar={handleClickStar}
          />
        )
      ) : (
        <li className='w-full rounded-lg px-5 py-[10px]'>
          <p>저장된 스크랩이 없습니다.</p>
        </li>
      )}
    </>
  );
};

export default ScrapePost;
