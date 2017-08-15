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
                        that.setState({
                            s: true,
                            c: "visa视频广告，点击收藏。"
                        });
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
                <video ref={(video)=>{this.video=video;}} controls playsInline style={{width:this.state.w}} src="http://116.77.75.16/variety.tc.qq.com/A8Tp4g42he8sGQ1sdkeFjfp1qZbg4GTbWGsfEk3Cw8X8/q0200hhafx1.p201.1.mp4?vkey=A9CF4135FFD442A543DA472C671800C2B4F37621A8FE3B945E595611DB3B8136BBB4C94409482653ACDD4EB71F4F3C935E94DC112390630A144131CD39327881B6FA5E49388C15B8CFD394C3D364ED21F1F37EDA9CAD2FC4&platform=&sdtfrom=&fmt=shd&level=0"/>
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
            </div>
        );
    }
}

export default CommonVedio;