import React from 'react';
import { connect } from 'dva';
import IndexContent from "../components/index.content.web";
import Cards from "../components/cards/index.card";
import TabView from "../components/layout/tabView.layout.web";

function MessagePage() {
  return (
    <div>
      <TabView index="2" />
    </div>
  );
}

MessagePage.propTypes = {
};

export default connect()(MessagePage);
