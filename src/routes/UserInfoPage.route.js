import React from 'react';
import { connect } from 'dva';
import UserInfo from "../components/user/info.user";

function UserInfoPage({user,dispatch}) {
  return (
    <div>
      <UserInfo userInfo={user.userInfo} dispatch={dispatch}/>
    </div>
  );
}

UserInfoPage.propTypes = {
};

export default connect(({user})=>({user}))(UserInfoPage);
