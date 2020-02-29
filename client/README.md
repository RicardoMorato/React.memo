# React.memo, how to start using it
The official documentation can be accessed [here](https://reactjs.org/docs/higher-order-components.html).

## Getting to know React.memo
React.memo is **an advanced technique in React for reusing component logic.**

Similar to useMemo and useCallback, the method React.memo uses the memoization technique to stop a component to be forced to re-render if it's parent re-renders. It means that React will skip rendering the component and reuse the last rendered result.

## It isn't magic, it's technology

