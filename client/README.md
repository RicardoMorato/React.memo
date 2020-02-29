# React.memo, how to start using it
The official documentation can be accessed [here](https://reactjs.org/docs/react-api.html#reactmemo).

## Getting to know React.memo
React.memo is **an advanced technique in React for reusing component logic.**

Similar to useMemo and useCallback, the method React.memo uses the memoization technique to stop a component to be forced to re-render if it's parent re-renders. It means that React will skip rendering the component and reuse the last rendered result.

## It isn't magic, it's technology
Basically, what the React framework does is:

> When a component’s props change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM.

What it means is that, if there's any change on the props, for example if they get destroyed and built (re-rendering), React will compare the newly built and the already rendered props. If any difference is noticed, the component will re-render, else, it stays the same and does not get rendered again.

## Code example
