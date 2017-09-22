import LessionUl from "../cards/lessionBought.card";
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import React from "react";

const TabPane = Tabs.TabPane;

class LessionForUser extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const {dispatch,courses} = this.props;
    if(JSON.stringify(courses) == "{}"){
      dispatch({type:"user/getCourseMain"});
    }
  }
  render(){
    const {courses}  = this.props;
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<Badge>已购买课程</Badge>} key="1">
            <LessionUl LessionList={courses.TeacherCourseReq.CourseList} />
          </TabPane>
          <TabPane tab={<Badge >待学习的课程</Badge>} key="2">
            <LessionUl LessionList={courses.TeacherCourseReq.CourseList} />
          </TabPane>
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}

export default LessionForUser;