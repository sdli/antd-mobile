import React , {Component } from "react";
import styles from "./card.style.less";
import Img from "../../assets/imgs/lu.jpg";
import {Progress,Icon,Button} from "antd-mobile";
import {hashHistory} from "react-router";
import VideoSvg from "../../assets/svgs/play-circle-o.svg";
import {Link} from "react-router";
import PencilSVG from "../../assets/svgs/pencil-square-o.svg";

class LessionList extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <div>
                <div className={styles.lessionImg}>
                    <img src={Img} />
                    <div className={styles.bottomMask}>
                        <div>
                            <p>陆士桢<span>教授，硕士生导师</span></p>
                            <p>授课：家风师德教育</p>
                            <p>课时：8课时</p>
                        </div> 
                    </div>
                </div>
                <div className={styles.lessionDesc}>
                    <p>课程简介：</p>
                    <p>陆士桢，女，汉族，中共党员，出生于1947年8月，教授，硕士生导师，国务院特殊贡献专家津贴，在青少年研究和社会工作领域享有一定学术声誉。曾任中国青年政治学院党委书记。</p>
                </div>
                <div className="divider"></div>
                <div>
                    <p className="p_title">
                        我的进度
                    </p>
                    <div className={styles.lessionProgress}>
                        <p>学习课程：2/8</p>
                        <div>
                            <Progress percent={34} position="normal" unfilled="show" />
                        </div>
                        <div className={styles.commentLink}>
                            <p style={{padding:"0 20%"}}><Button size="small" type="ghost" icon={PencilSVG} inline onClick={()=>hashHistory.push("/xinde")}>写心得</Button></p>
                            <p>提交您的学习心得</p>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <p className="p_title">
                        课程列表
                    </p>
                    <ul className={styles.lessionUl}>
                        <li>
                            <Link to={{pathname:"/videoplay"}} className="linkInit">
                                <Icon type={VideoSvg}/>
                                <div className={styles.lessionUlTitle}>
                                    <p>家庭教育的10个注意事项，专题1</p>
                                    <p>时长：32分钟</p>
                                </div>
                                <div className={styles.lessionUlFunc}>
                                        <p style={{lineHeight:"1rem",textAlign:"center",width:"100%",display:"block"}}>75<span className={styles.lessionUlSpan}>分</span></p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={{pathname:"/videoplay"}} className="linkInit">
                                <Icon type={VideoSvg}/>
                                <div className={styles.lessionUlTitle}>
                                    <p>家庭教育的10个注意事项，专题1</p>
                                    <p>时长：32分钟</p>
                                </div>
                                <div className={styles.lessionUlFunc}>
                                        <p style={{lineHeight:"1rem",textAlign:"center",width:"100%",display:"block"}}>75<span className={styles.lessionUlSpan}>分</span></p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={{pathname:"/videoplay"}} className="linkInit">
                                <Icon type={VideoSvg}/>
                                <div className={styles.lessionUlTitle}>
                                    <p>家庭教育的10个注意事项，专题1</p>
                                    <p>时长：32分钟</p>
                                </div>
                                <div className={styles.lessionUlFunc}>
                                        <p style={{lineHeight:"1rem",textAlign:"center",width:"100%",display:"block"}}>75<span className={styles.lessionUlSpan}>分</span></p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={{pathname:"/videoplay"}} className="linkInit">
                                <Icon type={VideoSvg}/>
                                <div className={styles.lessionUlTitle}>
                                    <p>家庭教育的10个注意事项，专题1</p>
                                    <p>时长：32分钟</p>
                                </div>
                                <div className={styles.lessionUlFunc}>
                                        <p style={{lineHeight:"1rem",textAlign:"center",width:"100%",display:"block"}}>75<span className={styles.lessionUlSpan}>分</span></p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={{pathname:"/videoplay"}} className="linkInit">
                                <Icon type={VideoSvg}/>
                                <div className={styles.lessionUlTitle}>
                                    <p>家庭教育的10个注意事项，专题1</p>
                                    <p>时长：32分钟</p>
                                </div>
                                <div className={styles.lessionUlFunc}>
                                        <p style={{lineHeight:"1rem",textAlign:"center",width:"100%",display:"block"}}>75<span className={styles.lessionUlSpan}>分</span></p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={{pathname:"/videoplay"}} className="linkInit">
                                <Icon type={VideoSvg}/>
                                <div className={styles.lessionUlTitle}>
                                    <p>家庭教育的10个注意事项，专题1</p>
                                    <p>时长：32分钟</p>
                                </div>
                                <div className={styles.lessionUlFunc}>
                                        <p style={{lineHeight:"1rem",textAlign:"center",width:"100%",display:"block"}}>75<span className={styles.lessionUlSpan}>分</span></p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={{pathname:"/videoplay"}} className="linkInit">
                                <Icon type={VideoSvg}/>
                                <div className={styles.lessionUlTitle}>
                                    <p>家庭教育的10个注意事项，专题1</p>
                                    <p>时长：32分钟</p>
                                </div>
                                <div className={styles.lessionUlFunc}>
                                        <p style={{lineHeight:"1rem",textAlign:"center",width:"100%",display:"block"}}>75<span className={styles.lessionUlSpan}>分</span></p>
                                </div>
                            </Link>
                        </li>
                       
                    </ul>
                </div>
                <div className="divider"></div>
            </div>
        );
    }
}

export default LessionList;