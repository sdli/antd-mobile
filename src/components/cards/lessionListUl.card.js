import styles from "./card.style.less";
import {Link} from "react-router";
import {Icon} from "antd-mobile";
import React from "react";
import VideoSvg from "../../assets/svgs/play-circle-o.svg";
import {hashHistory} from "react-router";

class listUl extends React.Component{
    constructor(props){
        super(props);
    }

    ifYouWannaBuy(){
        if(confirm("您尚未购买本课程，请确认是否购买？")){
            hashHistory.push("/");
        }
    }

    render(){
        const {LessionList,CourseId,bought} = this.props;
        return(
                  <ul className={styles.lessionUl}>
                        {LessionList !== "undefined" && LessionList.map((val,index)=>{
                            return  bought?
                                (<li key={index}>
                                    <Link to={{pathname:"/videoplay",query:{CourseId:CourseId,LessonId:val.LessonId,VideoId:val.VideoId}}} className="linkInit">
                                        <Icon type={VideoSvg}/>
                                        <div className={styles.lessionUlTitle}>
                                            <p>{val.Description}</p>
                                            <p>时长：32分钟</p>
                                        </div>
                                        <div className={styles.lessionUlFunc}>
                                                <p style={{lineHeight:"1rem",textAlign:"center",width:"100%",display:"block"}}>{val.LessonScore}<span className={styles.lessionUlSpan}>分</span></p>
                                        </div>
                                    </Link>
                                </li>):(
                                    <li key={index} onClick = {()=>{ifYouWannaBuy()}}>
                                        <Icon type={VideoSvg}/>
                                        <div className={styles.lessionUlTitle}>
                                            <p>{val.Description}</p>
                                            <p>时长：32分钟</p>
                                        </div>
                                        <div className={styles.lessionUlFunc}>
                                                <p style={{lineHeight:"1rem",textAlign:"center",width:"100%",display:"block"}}>{val.LessonScore}<span className={styles.lessionUlSpan}>分</span></p>
                                        </div>
                                    </li>
                                );
                        })}
                    </ul>
        );
    }
}

export default listUl;