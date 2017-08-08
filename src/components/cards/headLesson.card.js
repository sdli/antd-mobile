import { Progress, Button } from 'antd-mobile';
import React, {Component} from "react";
import styles from "./card.style.css";
import Lushizhen from "../../assets/imgs/lushizhen.png";
import Lizhaoliang from "../../assets/imgs/lizhaoliang.png";
import Liwendao from "../../assets/imgs/liwendao.png";
import Liuxiaoting from "../../assets/imgs/liuxiaoting.png";
import Zhaogang from "../../assets/imgs/zhaogang.png";

class LessonList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={{backgroundColor:"#ffffff",marginTop:"16px",paddingBottom: "240px"}}>
                <div className={styles.cardTitle}>
                    专家专栏
                </div>
                <div>
                    <div className={styles.lessonCell}>
                        <img src={Lushizhen} />
                        <div className={styles.lessonStat}>
                            <h4>陆士桢教授</h4>
                            <p>家风师德教育</p>
                            <p>共计：8课时</p>
                            <p>完成进度：2/8</p>
                            <div style={{width:"100%",padding:"32px 0"}}>
                               <Progress percent={34} position="normal" unfilled="show" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.lessonCell}>
                        <img src={Lizhaoliang} />
                        <div className={styles.lessonStat}>
                            <h4>李兆亮教授</h4>
                            <p>心理健康第一期</p>
                            <p>共计：8课时</p>
                            <p>完成进度：2/8</p>
                            <div style={{width:"100%",padding:"32px 0"}}>
                               <Progress percent={34} position="normal" unfilled="show" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.lessonCell}>
                        <img src={Liwendao} />
                        <div className={styles.lessonStat}>
                            <h4>李文道教授</h4>
                            <p>心理健康第二期</p>
                            <p>共计：8课时</p>
                            <p>完成进度：2/8</p>
                            <div style={{width:"100%",padding:"32px 0"}}>
                               <Progress percent={34} position="normal" unfilled="show" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.lessonCell}>
                        <img src={Liuxiaoting} />
                        <div className={styles.lessonStat}>
                            <h4>刘哮听教授</h4>
                            <p>传统文化教育</p>
                            <p>共计：8课时</p>
                            <p>完成进度：2/8</p>
                            <div style={{width:"100%",padding:"32px 0"}}>
                               <Progress percent={34} position="normal" unfilled="show" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.lessonCell}>
                        <img src={Zhaogang} />
                        <div className={styles.lessonStat}>
                            <h4>赵刚教授</h4>
                            <p>家校共育</p>
                            <p>共计：8课时</p>
                            <p>完成进度：2/8</p>
                            <div style={{width:"100%",padding:"32px 0"}}>
                               <Progress percent={34} position="normal" unfilled="show" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

export default LessonList;