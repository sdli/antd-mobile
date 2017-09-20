import VideoPlayer from "../components/layout/video.layout.web.js";
import { connect } from 'dva';
import React , {Component} from "react";
import getQuery from "../components/tools/getQuery";

class VideoPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {user,dispatch} = this.props;
        const CourseId = getQuery(this.props,"CourseId");
        const LessonId = getQuery(this.props,"LessonId");
        const VideoId = getQuery(this.props,"VideoId");
        const ifData = (JSON.stringify(user.lessonDetails) != "{}");
        return (
            <div>
                <div>
                    {
                        user.login &&
                        <VideoPlayer dispatch={dispatch} lessonDetails={user.lessonDetails} LessonId={LessonId} CourseId={CourseId} VideoId={VideoId} />
                    }  
                </div>
            </div>
        );
    }
}

export default connect(({user})=>({user}))(VideoPage);