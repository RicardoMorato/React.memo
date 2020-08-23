# Memoization using

<a href="https://reactjs.org/docs/react-api.html#reactmemo" ><img src="https://www.import.io/wp-content/uploads/2017/10/React-logo-1.png" />
</a>

This project was developed to teach and learn the principles of memoization using React.

If you are not interested on knowing memoization and wants to know only about React.memo and how it was used in this project, go to the [Project's Readme](https://github.com/RicardoMorato/React.memo/blob/master/client/README.md)

## First of all, what is memoization?

To first understand the the power that comes with React.memo, we have to be familiar with the term 'memoization'.
This term was first used by <a href="https://en.wikipedia.org/wiki/Donald_Michie">Donald Michie</a>, and comes from Latin from the word "memorandum" ("to be remembered"). That says a lot, right?
In american english memoization often gets truncated as 'memo', which is how we know it.

To be simple, memoization remembers a lot something that we are already familiarized with: **_Caching_**. The reason of existance of caching is quite simple:

> Avoid doing the same work repeatedly to avoid spending unnecessary running time or resources! Because we, the computer science guys are “lazy”.

The main difference between memoization and caching is that memo is the caching technique on the scope of a **Function!**.

> Memoization is an optimization technique where expensive function calls are cached such that the result can be immediately returned the next time the function is called with the same arguments, with no need of recalculation.

## Ok, that seems great, but how do I use it on the code?

To code your own memo function you can do something like this:

```javascript
let cacheEmulator = {};

function sumInCache(a, b, c) {
  const key = `${a}-${b}-${c}`;
  if (key in cacheEmulator) {
    return cacheEmulator[key];
  }

  const result = a + b + c;
  cacheEmulator = { ...cacheEmulator, key: result };
  return result;
}
```

As you can see, we transform the parameters of `sumInCache()` to string and concatenate them to be the key of the cacheEmulator. So say, if we call 10000 times of `sumInCache(1, 2, 3)`, the real calculation happens only the first time, the other 9999 times of calling just return the cached value in cacheEmulator, THAT'S FAST!

For now, we can easily think of 2 use cases to turn a function to its memoized version.

- If the function is pure and computation intensive and called repeatedly.
- If the function is pure and is recursive.

The first one is straightforward, it’s just simple caching, but it is super powerful. The second one is more interesting and we will explore it a little bit more now:

### Memoization in recursive functions:

We will use the Fibonacci sequence to illustrate it.

```javascript
function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

That's the Fibonacci sequence recursively. We all are quite familiarized to it, but we also must know that, for bigger numbers, this code can be quite expensive because it's complexity is O(2^n).

> O(2^n) denotes an algorithm whose growth doubles with each additon to the input data set. The growth curve of an O(2^n) function is exponential - starting off very shallow, then rising meteorically.

Okay, that's bad, so we can use our new (super powerful) weapon to neutralize it. Let's breakdown Fibonacci's code execution using a graph.

<a href=""><img src="https://miro.medium.com/max/604/1*48d8pI_c1-mQYV5xsz8XSQ.png" /></a>

As we can see, there are some repeated calculations. For example, `fibonacci(3)` is computed 3 times, `fibonacci(2)` is computed 5 times, and so on so forth.

If we make fibonacci memoized, then we can guarantee for a number n, it’s fibonacci number will be calculated only once, this enhanced version of Fibonacci can be written like this:

```javascript
function memoize(f) {
  const cacheLookup = {}; // Value cache stored in the closure
  return function () {
    const key = Array.prototype.join.call(arguments, "-");
    if (key in cacheLookup) {
      return cacheLookup[key];
    } else {
      return (cacheLookup[key] = f.apply(this, arguments));
    }
  };
}

const fibonacci = memoize(function (n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
});
```

After it the graph that we use to represent the Fibonacci sequence becomes something like this:
<a href=""><img src="https://miro.medium.com/max/604/1*JkK1CMWIdklNgumdUl-_Zw.png" /></a>

The function calls in the blue boxes have been already computed, so they are just skipped, which reduces the complexity to O(n) now! But, in the other hand, the space also becomes O(n).

> Memoziation is beneficial when there are **common subproblems** that are being solved repeatedly. Thus we are able to use some extra storage to save on repeated computation. To choose for this trade-off is completely up to you.

## Let's go to the good part, memoization on React

While in some languages the developer must incorporate her/his own method of memoization, React has it's own.

Imagine you have the following components tree in your project:
<a href="">
<img src="https://hackernoon.com/hn-images/1*rnA953CTaUmjcG7jGice0w.png" width="600px" />
</a>

If, for some reason, the `Parent 1` re-renders (maybe it's state changed because of an input or something), `Child` and `Child 2` will also re-render, **_even if nothing changed on then_**. That's something that happens constantly in every React project, and that's fine if your App doesn't have this many components, but imagine having to re-render an entire Application just because you typed a single letter in an input. It isn't something to look forward, right?

When we used Classes in React, we've had the `shouldComponentUpdate()`, but it was super dangerous because it basically blocked the React's magic, which is to constantly re-render.

But you might say 'But nowadays, with React Hooks we have useMemo and useCallback', you're absolutely right, I was getting to this point just know:

### React.memo VS useMemo VS useCallback

<a href=""><img src="https://i.ytimg.com/vi/4BranN3qnDU/maxresdefault.jpg" width="600px" /></a>

First of all. this isn't a fight and you don't have to pick a side. You can use all 3 of them in a project, but it is important to know what you're doing and their differences.

In a basic way, the three of them do the same thing, but with different scope.

- React.memo memoizes an entire component, and is used like this:

```javascript
import React, { memo } from "react";

function PostItem({ post }) {
  return (
    <li>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </li>
  );
}

export default memo(PostItem);
```

But, if the parent passes a non-primitive type as an array by props, it breaks.

- To resolve it, we use useMemo, which will memoize the value of an variable. So, we can do something like this:

```javascript
import React, { useMemo } from "react";
import PostItem from "../PostItem/PostItem";

function PostList() {
  const array = useMemo(() => {
    return ["one", "two", "three"];
  }, []);

  return (
    <ul>
      <postItem array={array} />
    </ul>
  );
}

export default PostList;
```

Similar to the useMemo, the useCallback works with functions, since they have the same syntax, we won't highlight an example here, but feel free to contribute if necessary.

## Conclusion

<img src="https://daqxzxzy8xq3u.cloudfront.net/wp-content/uploads/2019/07/24121630/avoid-re-rendering-feature-img1.jpg" width="450px" />

Memoization is a great technique and should be used more often amongst developers. Since React has it's own methods, why not explore them and make a more beatiful and fast code?

But, even so it seems great (and it really is), it is important to know when and where to use, because **an unnecessary memoization is as bad as not memoizing at all!**

More generally consider using memoization only for those possibly frequently called functions whose arguments may appear the same repeatedly. And, in React, use the different methods only when you see a constant and unnecessary re-rendering, when using React.memo.

## Useful bibliography

- <a href="https://medium.com/@chialunwu/wtf-is-memoization-a2979594fb2a">WTF is Memoization - Leo wu</a>

- <a href="https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19">Understanding JavaScript Memoization In 3 Minutes - Codesmith</a>

- <a href="http://inlehmansterms.net/2015/03/01/javascript-memoization/">JavaScript Function Memoization - Jonathan Lehman</a>

- <a href="https://www.sitepoint.com/implementing-memoization-in-javascript/">Implementing Memoization in JavaScript - Colin Ihrig</a>

- <a href="https://reactjs.org/docs/react-api.html#reactmemo">React.memo - React Documentation</a>

- <a href="https://www.youtube.com/watch?v=4BranN3qnDU">React.memo, useMemo, and useCallback Optimizations - Code Bushi</a>
