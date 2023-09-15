import React from 'react';
import PostList, { PostListProps } from './PostList';

const ScrapePost = ({ post, scrapeList, handleClickStar }: PostListProps) => {
  return (
    <>
      {scrapeList.length !== 0 &&
        post._id === scrapeList.find((scrape) => scrape === post._id) && (
          <PostList
            post={post}
            scrapeList={scrapeList}
            handleClickStar={handleClickStar}
          />
        )}
    </>
  );
};

export default ScrapePost;
