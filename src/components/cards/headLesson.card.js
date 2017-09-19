import { Progress, Button,Icon } from 'antd-mobile';
import React, {Component} from "react";
import styles from "./card.style.less";
import HourGlass from "../../assets/svgs/hourglass-half.svg";
import Lushizhen from "../../assets/imgs/lushizhen.png";
import Lizhaoliang from "../../assets/imgs/lizhaoliang.png";
import Liwendao from "../../assets/imgs/liwendao.png";
import Liuxiaoting from "../../assets/imgs/liuxiaoting.png";
import Liufenghua from "../../assets/imgs/liufenghua.png";
import Zhaogang from "../../assets/imgs/zhaogang.png";
import Sunyunxiao from "../../assets/imgs/sunyunxiao.png";
import {Link} from "react-router";


const images = [
    {
        title:"陆士桢",
        image: Lushizhen
    },
    {
        title:"刘凤华",
        image: Liufenghua
    },
    {
        title:"李兆良",
        image: Lizhaoliang
    },
    {
        title:"李文道",
        image: Liwendao
    },
    {
        title:"赵刚",
        image: Zhaogang
    },
    {
        title:"孙云晓",
        image: Sunyunxiao
    }
];

function getImage(title){
    return images.find((val)=>val.title==title);
}

function findUserCourse(userCourses,courseId){
    return userCourses.find((val)=>val.CourseId == courseId);
}

class LessonList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {courses} = this.props;
        console.log(courses);
        return (
            <div style={{backgroundColor:"#ffffff",marginTop:"16px"}}>
                <div className={styles.cardTitle}>
                    专家专栏
                </div>
                <div>
                    {
                        (courses.hasOwnProperty("CourseList")) &&
                        courses.CourseList.map(function(val,index){
                              var image = getImage(val.Professor); 
                              return (
                                  <div className={styles.lessonCell} key={index}>
                                    <img src={image.image} />
                                    <Link to={{pathname:"/lessionList",query:{CourseId:val.CourseId}}} className={styles.linkInit}>
                                        <div className={styles.lessonStat}>
                                            <p>{val.Professor}</p>
                                            <p>{val.CourseName}</p>
                                            <p>完成：0/{val.LessonList.length}课时，观看人数：{val.WatchNum}</p>
                                            <div className={styles.progressBar}>
                                                <Progress percent={1} position="normal" unfilled="show" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    }

                    {
                        (courses.hasOwnProperty("CourseQueryReq")) &&
                        courses.CourseQueryReq.CourseList.map((val,index)=>{
                            var userData = findUserCourse(courses.TeacherCourseReq.CourseList,val.CourseId);
                            var image = getImage(val.Professor); 
                            return (
                                <div className={styles.lessonCell} key={index}>
                                    <img src={image.image} />
                                    <Link to={{pathname:"/lessionList",query:{CourseId:val.CourseId}}} className={styles.linkInit}>
                                        <div className={styles.lessonStat}>
                                            <p>{val.Professor} 
                                                {(typeof userData !== "undefined" && userData)?
                                                    <span style={{float:"right",color:"#00AD1B",fontSize:"0.2rem"}}><Icon style={{width:"0.24rem",height:"0.24rem"}} type={HourGlass} /> 学习中</span>
                                                    :<span style={{float:"right",color:"#999999",fontSize:"0.2rem"}}>未开通</span>
                                                }
                                            </p>
                                            <p>{val.CourseName}</p>
                                            <p>完成：{(typeof userData !== "undefined" && userData)?userData.FinishLesson:0}/{val.LessonList.length}课时，观看人数：{val.WatchNum}</p>
                                            <div className={styles.progressBar}>
                                                <Progress percent={1} position="normal" unfilled="show" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    }       
                </div>
            </div>
        );
    }
} 

export default LessonList;