import React , {Component} from "react";
import ReactDom from "react-dom";
import styles from "./video.css";
import isMobile from "../tools/isMobile";
import Img from "../../assets/imgs/lu.jpg";
import PlaySvg from "../../assets/svgs/play.svg";
import {Icon } from "antd-mobile";

class CommonVedio extends Component{
    constructor(props){
        super(props);
        this.state={
            w: 0,
            h: 0,
            s: false
        };
    }

    componentDidMount(){
        var {VideoId,CollectList,dispatch,CourseId,LessonId,onStart} = this.props;
        console.log(CollectList);
        const w = window.screen.width;
        var that = this, pause = false,played = false;

        console.log(VideoId,"检测播放器更新");
        console.log(window.player);

        var catchVideo;
        window.catchVideo = catchVideo;

        var option ={
            "auto_play":"0",
            "file_id": VideoId,
            "app_id":"1254437760",
            "width":"100%",
            "height": parseInt(w*isMobile*540/960,10),
            "https": 1
        };

        console.log(option);

        var player = window.player = new qcVideo.Player( 
            "ts_player", 
            option,
            {
                playStatus: function(e){
                    console.log(e);
                    switch (e){
                        case "playing": timeCheck(player,CollectList);played=true; break;
                        case "seeking": (played && !pause)?timeCheck(player,CollectList):clearTimeout(catchVideo); break;
                        case "suspended":  clearTimeout(catchVideo); break;
                        case "playEnd": clearTimeout(catchVideo);break;
                        case "ready": clearTimeout(catchVideo);break;
                        default : return;
                    }
                }
            }
        );

        this.playButton.addEventListener("click",function(){
            player.play();
            onStart();
        });

        function timeCheck(player,Collects){
            var timeDeleted = 0;
            var currentTime = player.getCurrentTime();
            var text = "";
            var count = 1;
            var collectTime = 0;
            var CollectIndex = 0;
            for(var i = 0;i<Collects.length;i++){
                console.log(Collects[i].Time,currentTime);
                if(currentTime+15 <= Collects[i].Time){
                    timeDeleted = Collects[i].Time-currentTime;
                    collectTime = Collects[i].Time; 
                    text = Collects[i].CollectCnt;
                    CollectIndex = Collects[i].CollectIndex;
                    count = i;
                    break;
                }
            }

            if(timeDeleted == 0){
                return false;
            }else{
                clearTimeout(window.catchVideo);
                window.catchVideo = setTimeout(
                    function(){
                        player.pause();
                        pause = true;
                        if(confirm("请点击确认收藏：" + text)){
                            console.log("通过，开始下一个计时");
                            dispatch({type:"user/collect",bodyObj:{
                                CollectIndex: CollectIndex,
                                CourseId: CourseId,
                                LessonId: LessonId,
                                reqType: "collect"
                            }});
                            timeCheck(player,Collects);
                            player.resume();
                            pause = false;
                        }else{ 
                            console.log("未通过，下一个问题开始计时");
                            timeCheck(player,Collects);
                            player.resume();
                            pause = false;
                        }
                    },(timeDeleted)*1000
                );
                console.log("设置为第"+count+"个弹窗"+", 弹窗将会在"+timeDeleted+"后出现");
            }
        }
    }

    componentWillUnmount(){
        var {dispatch}  = this.props;
        clearTimeout(catchVideo);
        dispatch({type:"user/clearLessonDetails"});
    }

    shouldComponentUpdate(nextProps){
        console.log(nextProps);
        return (nextProps.CourseId == this.props.CourseId && nextProps.LessonId == this.props.LessonId && nextProps.show == this.props.show)?false:true;
    }

    render(){
        const {lessonInfo,onStart,show}  = this.props;
        console.log(lessonInfo,"我在这里");
        return (
            <div>
                <div className={styles.videoSection}>
                <div id="ts_player" ref={(video)=>{this.video = video;}}></div>
                    {
                        show &&
                        <div className={styles.videoMask}>
                            <div></div>
                            <div className={styles.videoPlay}>
                                <h3>{lessonInfo.LessonName}</h3>
                                <p><span ref={(playButton)=>{this.playButton = playButton;}}><Icon type={PlaySvg} style={{height: "0.28rem",width:"0.28rem"}}/> 播放</span></p>
                            </div>
                            <div className={styles.score}>
                                <div className={styles.lessionLength}>
                                    <p>课程专家：{lessonInfo.Professor}</p>
                                    <p>视频时常：{Math.floor(lessonInfo.VideoLength/60)}分钟</p>
                                </div>
                                <div className={styles.myScore}>
                                    <p>{lessonInfo.LessonScore}<span>分</span></p>
                                    <p>我的成绩</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.lessionDesc}>
                    <p>课程简介：</p>
                    <p>{lessonInfo.Description}</p>
                </div>
            </div>

        );
    }
}

export default CommonVedio;