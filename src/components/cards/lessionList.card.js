import React , {Component } from "react";
import styles from "./card.style.less";
import Img from "../../assets/imgs/lu.jpg";
import {Progress,Icon,Button} from "antd-mobile";
import {hashHistory} from "react-router";
import {Link} from "react-router";
import PencilSVG from "../../assets/svgs/pencil-square-o.svg";
import LessionUl from "./lessionListUl.card";

class LessionList extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    getCourseData(courses,CourseId){
        if(typeof courses === "undefined" || JSON.stringify(courses) == "{}") return [];
        var coursesList = (courses.hasOwnProperty("CourseList"))?courses.CourseList:courses.CourseQueryReq.CourseList;
        return coursesList.find((val)=>val.CourseId == CourseId);
    }

    getUserCourse(courses,CourseId){
        if(typeof courses === "undefined" || JSON.stringify(courses) == "{}" || !courses.hasOwnProperty("TeacherCourseReq")) return [];
        return courses.TeacherCourseReq.CourseList.find((val)=>parseInt(val.CourseId) == CourseId);
    }

    render(){
        const {courseList,CourseId,login} = this.props;
        if(JSON.stringify(courseList) == "{}" || typeof courseList === "undefined") return null;
        console.log(courseList);
        var CourseData =  this.getCourseData(courseList,CourseId);
        var UserData = this.getUserCourse(courseList,CourseId);
        console.log(CourseData,UserData);
        return(
            <div>
                <div className={styles.lessionImg}>
                    <img src={CourseData.ImagePhoto} />
                    <div className={styles.bottomMask}>
                        <div>
                            <p>{CourseData.Professor}<span>{CourseData.ProfessorTitle}</span></p>
                            <p>专题：《{CourseData.CourseName}》</p>
                            <p>课时：{CourseData.LessonList.length}课时</p>
                        </div> 
                    </div>
                </div>
                <div className={styles.lessionDesc}>
                    <p>专题简介：</p>
                    <p>{CourseData.Description}</p>
                </div>
                <div className="divider"></div>
                <div>
                    <p className="p_title">
                        我的进度
                    </p>
                    <div className={styles.lessionProgress}>
                        <p>学习课程：{(typeof UserData !== "undefined" && "FinishLesson" in UserData)?UserData.FinishLesson:"0"}/{CourseData.LessonList.length}</p>
                        <div>
                            <Progress percent={34} position="normal" unfilled="show" />
                        </div>
                        {
                            (UserData && UserData.FinishLesson == CourseData.LessonList.length) && UserData.Opinion == "" &&
                            <div className={styles.commentLink}>
                                    <p style={{padding:"0 20%"}}><Button size="small" type="ghost" icon={PencilSVG} inline onClick={()=>hashHistory.push("/xinde?CourseId="+CourseId)}>写心得</Button></p>
                                <p>已完成课程，可以写学习心得！</p>
                            </div>
                        }
                        {
                            UserData && UserData.Opinion != "" &&
                            <div>
                                <p style={{color:"#999999",fontSize:"0.24rem",lineHeight:"0.5rem"}}>课程心得：</p>
                                <p style={{color:"#4d4d4d",fontSize:"0.28rem",lineHeight:"0.3rem"}}>{UserData.Opinion}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <p className="p_title">
                        课程列表
                    </p>
                    <LessionUl login={login} bought={(typeof UserData == "undefined")?false:true} LessionList={(typeof UserData !== "undefined" && UserData.length!=0)?UserData.LessonList:CourseData.LessonList} CourseId={CourseId} />
                </div>
                <div className="divider" style={{height:"2rem"}}></div>
                {
                    !login &&
                    <div className={styles.loginBottom} onClick={()=>{hashHistory.push("/loginSelect")}}>
                        <p>请登录后查看详细课程</p>
                    </div>
                }
                {
                    login && (typeof UserData == "undefined") &&
                    <div className={styles.loginBottom} onClick={()=>{hashHistory.push("/pay")}}>
                        <p>请购买后查看此课程</p>
                    </div>
                }
            </div>
        );
    }
}

export default LessionList;