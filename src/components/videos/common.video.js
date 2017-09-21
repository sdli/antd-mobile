import React , {Component} from "react";
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
        console.log(CoverURL,RetString,VideoId);
        var player = new prismplayer({
            id: "J_prismPlayer",
            autoplay: false,
            playsinline:true,
            width:"100%",
            height:"100%",
            controlBarVisibility:"clicked",
            useH5Prism:true,
            useFlashPrism:false,
            vid : VideoId,
            playauth : RetString,
            cover: CoverURL,
            skinLayout:[{"name":"bigPlayButton","align":"blabs","x":30,"y":80},
            {"name":"H5Loading","align":"cc"},
            {"name":"controlBar","align":"blabs","x":0,"y":0,"children":[{"name":"progress","align":"tlabs","x":0,"y":0},
            {"name":"timeDisplay","align":"tl","x":10,"y":24}
        ]}]  
            
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

            console.log(timeDeleted);
            if(timeDeleted == 0){
                return false
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
                console.log("设置为第"+(count+1)+"弹窗"+"，弹窗时间："+timeDeleted+"秒以后，弹窗内容："+text);
        }
    }

    render(){
        console.log(isMobile);
        const {SecurityTokenReq}  = this.props;
        const favorites = [
            {time:10,content:"visa视频广告，点击收藏。",score:5},
            {time:20,content:"让亲情不被打断，点击收藏。",score:10},
        ];
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
                                <h3>家庭教育的核心是什么？</h3>
                                <p><span ref={(playButton)=>{this.playButton = playButton;}}><Icon type={PlaySvg} style={{height: "0.28rem",width:"0.28rem"}}/> 播放</span></p>
                            </div>
                            <div className={styles.score}>
                                <div className={styles.lessionLength}>
                                    <p>课程专家：陆士桢教授</p>
                                    <p>视频时常：32分钟</p>
                                </div>
                                <div className={styles.myScore}>
                                    <p>85<span>分</span></p>
                                    <p>我的成绩</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.lessionDesc}>
                    <p>课程简介：</p>
                    <p>陆士桢，女，汉族，中共党员，出生于1947年8月，教授，硕士生导师，国务院特殊贡献专家津贴，在青少年研究和社会工作领域享有一定学术声誉。曾任中国青年政治学院党委书记。</p>
                </div>
            </div>

        );
    }
}

export default CommonVedio;