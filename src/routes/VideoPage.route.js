import VideoPlayer from "../components/layout/video.layout.web.js";
import { connect } from 'dva';
import React , {Component} from "react";
import getQuery from "../components/tools/getQuery";

class VideoPage extends Component{
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
        const VideoId = getQuery(this.props,"VideoId");
        const lessonInfo = (typeof user.courses.TeacherCourseReq !== "undefined")?this.getLessonInfo(user.courses.TeacherCourseReq.CourseList,CourseId,LessonId):{};            
        return (
            <div>
                <div>
                    {
                        user.login && 
                        JSON.stringify(lessonInfo) != "{}" &&
                        <VideoPlayer lessonInfo={lessonInfo} dispatch={dispatch} lessonDetails={user.lessonDetails} LessonId={LessonId} CourseId={CourseId} VideoId={VideoId} />
                    }
                </div>
            </div>
        );
    }
}

export default connect(({user})=>({user}))(VideoPage);