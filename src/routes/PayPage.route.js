import React from "react";
import { connect } from 'dva';
import {Button} from "antd-mobile";
import PaySelector from "../components/list/paySelector.list";

class PayPage extends React.Component{
    constructor(props){
        super(props);
    }

    getCoursesUnpaied(courses){
        console.log(courses);
        if(typeof courses.CourseQueryReq !== "undefined" && typeof courses.TeacherCourseReq !== "undefined"){
            if(courses.TeacherCourseReq.CourseList.length == 0){
                return courses.CourseQueryReq.CourseList;
            }else{
                return courses.CourseQueryReq.CourseList.map(function(val,index){
                    for(var i =0;i<courses.TeacherCourseReq.CourseList.length;i++){
                        if(val.CourseId == courses.TeacherCourseReq.CourseList[i].CourseId ){
                            return 0;
                        }
                    }
                    return val;
                });
            }
        }
    }

    render(){
        const {dispatch,user} = this.props;
        return(
            <div>
                <PaySelector dispatch={dispatch} callBack={()=>{console.log("data");}} courseList={user.courses.CourseQueryReq.CourseList}/>
            </div>
        );
    }
}

export default connect(({user})=>({user}))(PayPage);