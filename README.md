# React.memo
This project was developed to teache and learn the principles of memoization using React.

## First of all, what is memoization?
To first understand the the power that comes with React.memo, we have to be familiar with the term 'memoization'.
This term was first used by Donald Michie, and comes from Latin from the word "memorandum" ("to be remembered"). That says a lot, right?
In american english memoization often gets truncated as 'memo', which is how we know it.

To be simple, memoization remembers a lot something that we are already familiarized with: ***Caching***. The reason of existance of caching is quite simple:
>  Avoid doing the same work repeatedly to avoid spending unnecessary running time or resources! Because we, the computer science guys are “lazy”.

The main difference between memoization and caching is that memo is the caching technique on the scope of a **Function!**.

> Memoization is an optimization technique where expensive function calls are cached such that the result can be immediately returned the next time the function is called with the same arguments, with no need of recalculation.

## Ok, that seems great, but how do I use it on the code?
To code your own memo function you can do something like this:
```javascript
const cacheEmulator = {};
function myCache(a, b, c) {
    const key = `${a}-${b}-${c}`;
    if (key in cacheEmulator) {
        return cacheEmulator[key];
    }
   
    return a + b + c;
}
```
As you can see, we transform the parameters of `myCache()` to string and concatenate them to be the key of the cacheEmulator. So say, if we call 10000 times of memoize(myKey), the real calculation happens only the first time, the other 9999 times of calling just return the cached value in cacheEmulator, THAT'S FAST!

For now, we can easily think of 2 use cases to turn a function to its memoized version.
- If the function is pure and computation intensive and called repeatedly.
- If the function is pure and is recursive.

The first one is straightforward, it’s just simple caching, but it is super powerfull. The second one is more interesting and we will explore it a little bit more now:

### Memoization in recursive functions:

We will use the Fibonacci sequence to illustrate it.
```javascript
function fibonacci(n) {
    if ((n === 0) || (n === 1)) {
        return n;
    }
    return (fibonacci(n - 1) + fibonacci(n - 2));
}
```
That's the Fibonacci sequence recursively. We all are quite familiarized to it, but we also must know that, for bigger numbers, this code can be quite expensive because it's complexity is O(2n).

> O(2n) denotes an algorithm whose growth doubles with each additon to the input data set. The growth curve of an O(2n) function is exponential - starting off very shallow, then rising meteorically.

Okay, that's bad, so we can use our new (super powerfull) weapon to neutralize it. Let's breakdown Fibonacci's code execution using a graph.

<img src="https://miro.medium.com/max/604/1*48d8pI_c1-mQYV5xsz8XSQ.png" />

As we can see, there are some repeated calculations. For example, `fibonacci(3)` is computed 3 times, `fibonacci(2)` is computed 5 times, and so on so forth.

If we make fibonacci memoized, then we can guarantee for a number n, it’s fibonacci number will be calculated only once, this enhanced version of Fibonacci can be written like this:

```javascript
function memoize(f) {
    const cacheLookup = {}; // Value cache stored in the closure
    return function() {
        const key = Array.prototype.join.call(arguments,'-');
        if (key in cacheLookup) {
            return cacheLookup[key];
        } else {
            return cacheLookup[key] = f.apply(this, arguments);
        }
    }
}

const fibonacci = memoize(function (n) {
    if ((n === 0) || (n === 1)) {
        return n;
    }
    return (fibonacci(n - 1) + fibonacci(n - 2));
});
```
After it the graph that we use to represent the Fibonacci sequence becomes something like this:
<img src="https://miro.medium.com/max/604/1*JkK1CMWIdklNgumdUl-_Zw.png" />

The function calls in the blue boxes have been already computed, so they are just skipped, which reduces the complexity to O(n) now! But, in the other hand, the space also becomes O(n).

> Memoziation is beneficial when there are **common subproblems** that are being solved repeatedly. Thus we are able to use some extra storage to save on repeated computation. To choose for this trade-off is completely up to you.
