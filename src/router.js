import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LessonList from "./routes/LessionList.route";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/lessionList" component={LessonList} />
    </Router>
  );
}

export default RouterConfig;
