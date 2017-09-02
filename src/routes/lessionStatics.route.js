import React from 'react';
import { connect } from 'dva';
import Statics from "../components/user/lessionStatics.user";

function UserStaticsPage() {
  return (
    <div>
      <Statics />
    </div>
  );
}

UserStaticsPage.propTypes = {
};

export default connect()(UserStaticsPage);
