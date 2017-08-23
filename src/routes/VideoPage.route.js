import VideoPlayer from "../components/layout/video.layout.web.js";
import { connect } from 'dva';
import React , {Component} from "react";

class VideoPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <VideoPlayer />
            </div>
        );
    }
}

export default connect()(VideoPage);
