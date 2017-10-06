import Details from "../components/messages/commentDetails.message";
import Reply from "../components/messages/reply.message";
import React from "react";
import { connect } from 'dva';
import getQuery from "../components/tools/getQuery";

class CommentDetailsPage extends React.Component{
    constructor(props){
        super(props);
    }

    getLessonInfo(coursesList,courseId,LessonId){
        console.log(coursesList);
        for(var i=0;i<coursesList.length;i++){
            if(coursesList[i].CourseId == courseId){
                console.log("找到了列表",coursesList[i].LessonList,LessonId);
                for(var j=0;j<coursesList[i].LessonList.length;j++){
                    if(coursesList[i].LessonList[j].LessonId == LessonId ){
                        console.log("找到了课程",coursesList[i].LessonList[j]);
                        return Object.assign(
                            coursesList[i].LessonList[j],
                            {Professor:coursesList[i].Professor}
                        );
                    }
                }
            }
        }
    }

    render(){
        const {user,dispatch} = this.props;
        const CourseId = getQuery(this.props,"CourseId");
        const LessonId = getQuery(this.props,"LessonId");
        const LessonDetails = ("TeacherCourseReq" in user.courses)?this.getLessonInfo(user.courses.TeacherCourseReq.CourseList,CourseId,LessonId):{};
        return(
            <div>
                <Details LessonDetails={LessonDetails} />
                <Reply title="输入您的回复" CourseId={CourseId} LessonId={LessonId} dispatch={dispatch} />
            </div>
        );
    }    
}

export default connect(({user})=>({user}))(CommentDetailsPage);