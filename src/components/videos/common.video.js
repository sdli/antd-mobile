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

    getWindowWidth(){
        const w = window.screen.width;
        this.setState({w:w*isMobile,h:w*0.8});
    }

    componentDidMount(){
        var {CoverURL,RetString,VideoId,CollectList} = this.props;
        var that = this, pause = false;
        console.log(CoverURL,RetString,VideoId,"检测播放器更新");
        console.log(window.player);
        
        var player = window.player = new Aliplayer({
            id: "J_prismPlayer",
            autoplay: false,
            playsinline: true,
            width:"100%",
            height:"100%",
            controlBarVisibility:"clicked",
            useH5Prism:true,
            useFlashPrism:false,
            vid : VideoId,
            playauth : RetString,
            cover: CoverURL,
            format: "mp4"
        });

        var catchViedo;
        window.catchViedo = catchViedo;

        clearTimeout(catchViedo);

        player.on("play",function(){
            pause= false;
            timeCheck(player,CollectList);
        });

        player.on("seek",function(){
            timeCheck(player,CollectList);
        });
        player.on("pause",function(){
            pause = true;
            clearTimeout(window.catchViedo);
        });

        this.playButton.addEventListener("click",function(){
            that.setState({s:true});
            player.play();
        });

        this.video.addEventListener("click",function(){
            if(!pause){
                player.pause();
            }else{
                player.play();
            } 
        });

        function timeCheck(player,Collects){
            var timeDeleted = 0;
            var currentTime = player.getCurrentTime();
            var text = "";
            var count = 1;
            for(var i = 0;i<Collects.length;i++){
                console.log(Collects[i].Time,currentTime);
                if(currentTime < Collects[i].Time){
                    timeDeleted = Collects[i].Time-currentTime;
                    text = Collects[i].CollectCnt;
                    count = i;
                    break;
                }
            }

            if(timeDeleted == 0){
                return false;
            }else{
                clearTimeout(window.catchViedo);
                window.catchViedo = setTimeout(
                    function(){
                        player.pause();
                        if(confirm(text)){
                            console.log("通过，开始下一个计时");
                            timeCheck(player,Collects);
                        }else{ 
                            console.log("未通过，下一个问题开始计时");
                            timeCheck(player,Collects);
                        }
                    },timeDeleted*1000
                );
            }
        }
    }

    componentWillUnmount(){
        var {dispatch}  = this.props;
        clearTimeout(catchViedo);
        alert("我被清空了，救命啊！");
        dispatch({type:"user/clearLessonDetails"});
    }

    render(){
        console.log(isMobile);
        const {SecurityTokenReq,lessonInfo}  = this.props;
        console.log(lessonInfo,"我在这里");
        return (
            <div>
                <div className={styles.videoSection}>
                <div  className="prism-player" id="J_prismPlayer" ref={(video)=>{this.video = video;}}></div>
                    {
                        !this.state.s
                        &&
                        <div className={styles.videoMask}>
                            <div></div>
                            <div className={styles.videoPlay}>
                                <h3>"课程名称-空"</h3>
                                <p><span ref={(playButton)=>{this.playButton = playButton;}}><Icon type={PlaySvg} style={{height: "0.28rem",width:"0.28rem"}}/> 播放</span></p>
                            </div>
                            <div className={styles.score}>
                                <div className={styles.lessionLength}>
                                    <p>课程专家：{lessonInfo.Professor}</p>
                                    <p>视频时常：{lessonInfo.VideoLength/60}分钟</p>
                                </div>
                                <div className={styles.myScore}>
                                    <p>{lessonInfo.LessonSore}<span>分</span></p>
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