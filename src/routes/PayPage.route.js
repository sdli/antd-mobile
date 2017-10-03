import React from "react";
import { connect } from 'dva';
import {Button} from "antd-mobile";
import PaySelector from "../components/list/paySelector.list";
import {hashHistory} from "react-router";

class PayPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            notFull : false
        }
    }

    getCoursesUnpaied(courses){
        if(typeof courses.CourseQueryReq !== "undefined" && typeof courses.TeacherCourseReq !== "undefined"){
            if(courses.TeacherCourseReq.CourseList.length == 0){
                return {
                    notFull: false,
                    courseList : courses.CourseQueryReq.CourseList
                };
            }else{
                
                return {
                    notFull: true,
                    courseList: courses.CourseQueryReq.CourseList.map(function(val,index){
                        for(var i =0;i<courses.TeacherCourseReq.CourseList.length;i++){
                            if(val.CourseId == courses.TeacherCourseReq.CourseList[i].CourseId ){
                                return 0;
                            }
                        }
                        return val;
                    })
                }
            }
        }
    }

    render(){
        const {dispatch,user} = this.props;
        const courseInfo = this.getCoursesUnpaied(user.courses);
        if(courseInfo.courseList.every((val)=>{val == 0})){
            hashHistory.push("/");
        }
        return(
            <div>
                {
                    JSON.stringify(user.courses) != "{}"
                    &&
                    <div>
                        <PaySelector dispatch={dispatch} courseList={courseInfo.courseList} notFull={courseInfo.notFull}/>
                    </div>
                }
            </div>
        );
    }
}

export default connect(({user})=>({user}))(PayPage);