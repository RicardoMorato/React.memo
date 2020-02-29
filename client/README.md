# React.memo, how to start using it
The official documentation can be accessed [here](https://reactjs.org/docs/react-api.html#reactmemo).

## Getting to know React.memo
React.memo is **an advanced technique in React for reusing component logic.**

Similar to useMemo and useCallback, the method React.memo uses the memoization technique to stop a component to be forced to re-render if it's parent re-renders. It means that React will skip rendering the component and reuse the last rendered result.

This method only exists as a performance optimization. Do not rely on it to “prevent” a render, as this can lead to bugs.

## It isn't magic, it's technology
Basically, what the React framework does is:

> When a component’s props change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM.

What it means is that, if there's any change on the props, for example if they get destroyed and built (re-rendering), React will compare the newly built and the already rendered props. If any difference is noticed, the component will re-render, else, it stays the same and does not get rendered again.

## Code example
As you can see on the repository, we have the following code:

```javascript
import React, { useEffect, useState } from 'react';

import PostItem from '../PostItem/PostItem';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts').then(response => {
      response.json().then(data => {
        setPosts(data);
      })
    })
  }, []);

  return (
    <>
      <input onChange={e => setNewPost(e.target.value)} value={newPost} />
      <ul>
        {posts.map(post => <PostItem key={post.id} post={post} />)}
      </ul>
    </>
  );
};

export default PostList;

```

In which we have this PostList with several PostItems, which are receiving via props a key (`key={post.id}`) and a post (`post={post}`).

Now, we can see that there's an input that changes the PostList state, and, as we know, everytime there's a state change on React, the Component gets re-rendered. And, as PostItem is PostList's child, it would also get re-rendered. **Although there's no change on it.**

To avoid it we use React.memo. On the following code we can see how it's used:
```javascript
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

```

As we can see, we just import it via destructuring and, when exporting the component, we wrap it on the method, like this:
```javascript
export default memo(PostItem);
```
