import { Progress, Button } from 'antd-mobile';
import React, {Component} from "react";
import styles from "./card.style.less";
import Lushizhen from "../../assets/imgs/lushizhen.png";
import Lizhaoliang from "../../assets/imgs/lizhaoliang.png";
import Liwendao from "../../assets/imgs/liwendao.png";
import Liuxiaoting from "../../assets/imgs/liuxiaoting.png";
import Zhaogang from "../../assets/imgs/zhaogang.png";
import {Link} from "react-router";

class LessonList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={{backgroundColor:"#ffffff",marginTop:"16px"}}>
                <div className={styles.cardTitle}>
                    专家专栏
                </div>
                <div>
                    <div className={styles.lessonCell}>
                        <img src={Lushizhen} />
                        <Link to={{pathname:"/lessionList",query:{name:"lushizhen"}}} className={styles.linkInit}>
                            <div className={styles.lessonStat}>
                                <p>陆士桢 教授</p>
                                <p>家风师德教育</p>
                                <p>完成：2/8课时</p>
                                <div className={styles.progressBar}>
                                    <Progress percent={34} position="normal" unfilled="show" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.lessonCell}>
                        <img src={Lizhaoliang} />
                        <Link to={{pathname:"/lessionList",query:{name:"lizhaoliang"}}} className={styles.linkInit}>
                            <div className={styles.lessonStat}>
                                <p>李兆亮良 教授</p>
                                <p>心理健康第一期</p>
                                <p>完成：2/8课时</p>
                                <div className={styles.progressBar}>
                                    <Progress percent={34} position="normal" unfilled="show" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.lessonCell}>
                        <img src={Liwendao} />
                        <Link to={{pathname:"/lessionList",query:{name:"liwendao"}}} className={styles.linkInit}>
                            <div className={styles.lessonStat}>
                                <p>李文道 教授</p>
                                <p>心理健康第二期</p>
                                <p>完成：2/8课时</p>
                                <div className={styles.progressBar}>
                                    <Progress percent={34} position="normal" unfilled="show" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.lessonCell}>
                        <img src={Liuxiaoting} />
                        <Link to={{pathname:"/lessionList",query:{name:"liuxiaoting"}}} className={styles.linkInit}>
                            <div className={styles.lessonStat}>
                                <p>刘孝听 教授</p>
                                <p>传统文化教育</p>
                                <p>完成：2/8课时</p>
                                <div className={styles.progressBar}>
                                    <Progress percent={34} position="normal" unfilled="show" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.lessonCell}>
                        <img src={Zhaogang} />
                        <Link to={{pathname:"/lessionList",query:{name:"zhaogang"}}} className={styles.linkInit}>
                            <div className={styles.lessonStat}>
                                <p>赵刚 教授</p>
                                <p>家校共育</p>
                                <p>完成：2/8课时</p>
                                <div className={styles.progressBar}>
                                    <Progress percent={34} position="normal" unfilled="show" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
} 

export default LessonList;