import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LessonList from "./routes/LessionList.route";
import VideoPage from "./routes/VideoPage.route";
import MessagePage from "./routes/Message.route";
import UserCenterPage from "./routes/UserCenter.route";
import CommentDetailsPage from "./routes/CommentDetails.route";
import XindePage from "./routes/Xinde.route";
import Nprogress from "./routes/Nprogress.route";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Nprogress}>
        <IndexRoute component={IndexPage}/>
        <Route path="/lessionList" component={LessonList} />
        <Route path="/videoplay" component={VideoPage} />
        <Route path="/message" component={MessagePage} />
        <Route path="/user" component={UserCenterPage} />
        <Route path="/commentDetails" component={CommentDetailsPage} />
        <Route path="/xinde" component={XindePage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
