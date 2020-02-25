import React from 'react';
import ReactDOM from 'react-dom';

import PostList from './components/PostList/PostList'

function App() {
  return (
    <section id="app">
      <PostList />
    </section>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
