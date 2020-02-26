import React, { memo } from 'react';

function PostItem({ post }) {

  return (
    <li>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </li>
  );
};

export default memo(PostItem);
