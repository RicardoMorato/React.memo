import React, { useEffect, useState } from 'react';
// import './PostList.scss'

function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts').then(response => {
      response.json().then(data => {
        setPosts(data);
      })
    })
  }, []);

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
};

export default PostList;
