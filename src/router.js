import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LessonList from "./routes/LessionList.route";
import VideoPage from "./routes/VideoPage.route";
import MessagePage from "./routes/Message.route";
import UserCenterPage from "./routes/UserCenter.route";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/lessionList" component={LessonList} />
      <Route path="/videoplay" component={VideoPage} />
      <Route path="/message" component={MessagePage} />
      <Route path="/user" component={UserCenterPage} />
    </Router>
  );
}

export default RouterConfig;
