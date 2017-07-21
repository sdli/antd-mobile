import React from 'react';
import { connect } from 'dva';
import IndexContent from "../components/index.content.web";
import Cards from "../components/cards/index.card";
import TabView from "../components/layout/tabView.layout.web";

function IndexPage() {
  return (
    <div>
      <TabView />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
