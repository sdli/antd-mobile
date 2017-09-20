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
        var {CoverURL,RetString,VideoId} = this.props;
        console.log(CoverURL,RetString,VideoId);
        var player = new prismplayer({
            id: 'J_prismPlayer',
            width: '100%',
            autoplay: true,
            vid : VideoId,
            playauth : RetString,
            cover: CoverURL
        });

        console.log({
            id: 'J_prismPlayer',
            width: '100%',
            autoplay: true,
            vid : VideoId,
            playauth : RetString,
            cover: CoverURL
        });
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
                <div className={styles.videoSection} style={{width:this.state.w}}>
                <div  className="prism-player" id="J_prismPlayer"></div>
                    {
                        this.state.s 
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