import React from 'react';
import { connect } from 'dva';
import UserInfo from "../components/user/info.user";

function UserInfoPage() {
  return (
    <div>
      <UserInfo />
    </div>
  );
}

UserInfoPage.propTypes = {
};

export default connect()(UserInfoPage);
