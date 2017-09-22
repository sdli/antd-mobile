import React from 'react';
import { connect } from 'dva';
import UserInfo from "../components/user/info.user";

function UserInfoPage({user}) {
  return (
    <div>
      <UserInfo userInfo={user.userInfo}/>
    </div>
  );
}

UserInfoPage.propTypes = {
};

export default connect(({user})=>({user}))(UserInfoPage);
