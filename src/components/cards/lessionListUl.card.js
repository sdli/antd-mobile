import styles from "./card.style.less";
import {Link} from "react-router";
import {Icon} from "antd-mobile";
import React from "react";
import VideoSvg from "../../assets/svgs/play-circle-o.svg";

class listUl extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
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
        );
    }
}

export default listUl;