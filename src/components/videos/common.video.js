import React , {Component} from "react";
import styles from "./video.css";
import isMobile from "../tools/isMobile";

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
                    if(parseInt(video.currentTime) == 10){
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
            <div className={styles.videoSection} style={{width:this.state.w}}>
                <video ref={(video)=>{this.video=video;}} controls playsInline style={{width:this.state.w}} src="http://116.77.66.164/variety.tc.qq.com/AY5-z9sccTSepYMGZxmydtsPrDg0pf-qWq2eNlkbeKNA/e02001daubo.p201.1.mp4?vkey=29B0AD053FE05B9E3280260B75EB7C362A50CCBE4E255FA8770D12014750A3ECAA6B644DD857F08FF5E5C8410D44BCBDDAEC9F3C2BDD7FBCC8A7F917D59691DF09C50E4090494F24C276F793FA0272DC7A50AE85D0962486&amp;platform=&amp;sdtfrom=&amp;fmt=shd&amp;level=0"/>
                {this.state.s &&
                    (
                        <div className={styles.favoritesDiv}>
                            <div className={styles.favoritesDivMask}></div>
                            <div className={styles.favoritesContent}>
                                <p>{this.state.c}</p>
                            </div>
                        </div>
                    )
                }
                <div className={styles.lessionDesc}>
                    <p>课程简介：</p>
                    <p>陆士桢，女，汉族，中共党员，出生于1947年8月，教授，硕士生导师，国务院特殊贡献专家津贴，在青少年研究和社会工作领域享有一定学术声誉。曾任中国青年政治学院党委书记。</p>
                </div>
            </div>
        );
    }
}

export default CommonVedio;