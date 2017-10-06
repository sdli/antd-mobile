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


    render(){
        const {LessionList,type} = this.props;
        return(
                <ul className={styles.lessionUl}>
                    {typeof LessionList !== "undefined" && LessionList.map((val,index)=>{
                        if(type==1){
                            return  (
                                <li key={"lessonList"+index}>
                                    <Link to={{pathname:"/lessionList",query:{CourseId:val.CourseId}}} className="linkInit">
                                        <Icon type={VideoSvg}/>
                                        <div className={styles.lessionUlTitle}>
                                            <p>{val.CourseName}</p>
                                            <p>课程数量：{val.LessonNum}课时</p>
                                        </div>
                                        <div className={styles.lessionUlFunc}>
                                            <p style={{lineHeight:"0.4rem",textAlign:"center",width:"100%",display:"block",fontSize:"0.20rem"}}><span>平均分</span></p>
                                            <p style={{lineHeight:"0.6rem",textAlign:"center",width:"100%",display:"block",fontSize:"0.32rem"}}>{Math.floor(val.Score/val.LessonNum)}<span className={styles.lessionUlSpan}>分</span></p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        }else{
                            if(Math.floor(val.Score/val.LessonNum) < 60){
                                return  (
                                    <li key={"lessonList"+index}>
                                        <Link to={{pathname:"/lessionList",query:{CourseId:val.CourseId}}} className="linkInit">
                                            <Icon type={VideoSvg}/>
                                            <div className={styles.lessionUlTitle}>
                                                <p>{val.CourseName}</p>
                                                <p>课程数量：{val.LessonNum}课时</p>
                                            </div>
                                            <div className={styles.lessionUlFunc}>
                                                <p style={{lineHeight:"0.4rem",textAlign:"center",width:"100%",display:"block",fontSize:"0.20rem"}}><span>平均分</span></p>
                                                <p style={{lineHeight:"0.6rem",textAlign:"center",width:"100%",display:"block",fontSize:"0.32rem"}}>{Math.floor(val.Score/val.LessonNum)}<span className={styles.lessionUlSpan}>分</span></p>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            }
                            return ;
                        }
                    })}
                </ul>
        );
    }
}

export default listUl;