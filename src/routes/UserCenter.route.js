import React from 'react';
import { connect } from 'dva';
import Cards from "../components/cards/index.card";
import TabView from "../components/layout/tabView.layout.web";

function UserCenterPage({user}) {
  return (
    <div>
      <TabView index="3" userInfo={user.userInfo} />
    </div>
  );
}

UserCenterPage.propTypes = {
};

export default connect(({user})=>({user}))(UserCenterPage);
