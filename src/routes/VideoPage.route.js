import VideoPlayer from "../components/layout/video.layout.web.js";
import { connect } from 'dva';
import React , {Component} from "react";
import getQuery from "../components/tools/getQuery";

class VideoPage extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {dispatch} = this.props;
        const CourseId = getQuery(this.props,"CourseId");
        const LessonId = getQuery(this.props,"LessonId");
        dispatch({
            type:"user/lessonDetails",
            bodyObj:{
                    CourseId: CourseId,
                    LessonId: LessonId,
                    reqType: "CollectInfoQueryReq"
                }
            }
        );
    }

    render(){

        const {user} = this.props;
        return(
            <div>
                <VideoPlayer Courses={user.courses} LessonId={LessonId} CourseId={CourseId} />
            </div>
        );
    }
}

export default connect(({user})=>{user})(VideoPage);