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
        this.getWindowWidth();
        let video = this.video;
        const that = this;
        video.addEventListener("play",function(){
            var catchViedo = setInterval(function(){
                if(video.paused){
                    clearInterval(catchViedo);
                }else{
                    if(parseInt(video.currentTime) == 10 && !video.paused){
                        video.pause();
                        if(confirm("专家收藏：请收藏专家的总结！")){
                            video.play();
                        }else{
                            video.play();
                        }
                    }
                }
            },1000);
        });
    }

    render(){
        console.log(isMobile);
        const favorites = [
            {time:10,content:"visa视频广告，点击收藏。",score:5},
            {time:20,content:"让亲情不被打断，点击收藏。",score:10},
        ];
        return (
            <div>
                <div className={styles.videoSection} style={{width:this.state.w}}>
                    <video 
                        ref={(video)=>{this.video=video;}} 
                        controls 
                        playsInline 
                        style={{width:this.state.w}}
                        poster = {Img}
                        src="http://116.77.75.16/vlive.qqvideo.tc.qq.com/AABSbFWEjPDdRP8No8YgVfOjkH5bkzaM54MjRbjRxCds/h002479qfd7.p212.1.mp4?sdtfrom=v1010&guid=00b8567265e9843e817cadb58599b100&vkey=9D3D228331BFCB6D500272BC3093367E3E238F7DF90A2226AA22C2F82215EE9CDD1F437F7A5CC028416CADB2AEF0A78D047F98F4171655FD35BDF48ADB4C7DCBA9F2E90BCFB08BCD98AB4FE3230E18138D77DEF72BE52F022290F5F7CE5E2587C02088232BE87EB4EE19269DCC96CFD8EE39C02FE7FB7392&platform=2"/>
                    {
                        !this.state.s 
                        &&
                        <div className={styles.videoMask}>
                            <div></div>
                            <div className={styles.videoPlay}>
                                <h3>家庭教育的核心是什么？</h3>
                                <p onClick={()=>{this.video.play();this.setState({s:true})}}><span><Icon type={PlaySvg} style={{height: "0.28rem",width:"0.28rem"}}/> 播放</span></p>
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