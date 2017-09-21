import React from 'react';
import { connect } from 'dva';
import Cards from "../components/cards/index.card";
import TabView from "../components/layout/tabView.layout.web";

class IndexPage extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <TabView index="1" courses={user.courses} />
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect(({user})=>({user}))(IndexPage);
