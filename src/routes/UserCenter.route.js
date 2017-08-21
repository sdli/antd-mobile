import React from 'react';
import { connect } from 'dva';
import IndexContent from "../components/index.content.web";
import Cards from "../components/cards/index.card";
import TabView from "../components/layout/tabView.layout.web";

function UserCenterPage() {
  return (
    <div>
      <TabView index="3" />
    </div>
  );
}

UserCenterPage.propTypes = {
};

export default connect()(UserCenterPage);
