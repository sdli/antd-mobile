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
        return (
            <div>
                <div>
                    <VideoPlayer dispatch={dispatch} lessonDetails={user.lessonDetails} LessonId={"1"} CourseId={"50008"} VideoId={"e9bd4b13953143ce8ff7cce7936988f5"} />
                </div>
            </div>
        );
    }
}

export default connect(({user})=>({user}))(VideoPage);