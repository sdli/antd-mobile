import React from 'react';
import { connect } from 'dva';
import Statics from "../components/user/lessionStatics.user";

function UserStaticsPage({user,dispatch}) {
  return (
    <div>
      <Statics courses={user.courses} dispatch={dispatch} />
    </div>
  );
}

UserStaticsPage.propTypes = {
};

export default connect(({user})=>({user}))(UserStaticsPage);
