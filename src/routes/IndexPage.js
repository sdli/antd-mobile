import React from 'react';
import { connect } from 'dva';
import Cards from "../components/cards/index.card";
import TabView from "../components/layout/tabView.layout.web";

function IndexPage({user}) {
  return (
    <div>
      <TabView index="1" courses={user.courses} />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(({user})=>({user}))(IndexPage);
