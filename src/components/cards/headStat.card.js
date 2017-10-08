import styles from "./card.style.less";
import {Icon} from "antd-mobile";
import ClockSVG from "../../assets/svgs/clock-o.svg";
import {Link} from "react-router";
import {getLocalStore} from "../../utils/setLocalStore";

const headStat = function({courses}){
    console.log(courses);
    if(typeof courses === "undefined" || JSON.stringify(courses) == "{}") return null;
    var length = 0;
    var average = 0;
    var finished = 0;
    if("CourseQueryReq" in courses){
        length = courses.CourseQueryReq.CourseList.reduce((val,val1)=>(val+val1.LessonList.length),0);
    }
    if("CourseList" in courses){
        length = courses.CourseList.reduce((val,val1)=>{return (val+val1.LessonList.length);},0);
    }
    if("TeacherCourseReq" in courses){
        finished = courses.TeacherCourseReq.CourseList.reduce((val,val1)=>(val+val1.FinishLesson),0);
        average = courses.TeacherCourseReq.CourseList.reduce((val,val1)=>(val+val1.Score),0)/length;
    }
    const videoInfo = JSON.parse(getLocalStore("videoHistory"));
    console.log(videoInfo);
    return (
        <div>
            {
                JSON.stringify(courses) != "{}"
                &&
                <div className={styles.headStat}>
                    <div className={styles.headStatCell} style={{borderRight:"1px solid #f0f0f0"}}>
                    <p>完成课程</p>
                    {
                        "TeacherCourseReq" in courses
                        &&
                        <p><span>{finished}</span>/{length}课时</p>
                    }
                    {
                        !("TeacherCourseReq" in courses)
                        &&
                        <p><span>0</span>/{length}课时</p>
                    }
                </div>
                <div className={styles.headStatCell}>
                    <p>平均得分</p>
                    {
                        "TeacherCourseReq" in courses
                        &&
                        <p><span>{Math.floor(average)}</span>分</p>
                    }
                    {
                        !("TeacherCourseReq" in courses)
                        &&
                        <p><span>0</span>分</p>
                    }
                    
                </div>
                <div className={styles.headStatRecord}>
                    <div>
                        <p style={{lineHeight: "0.8rem"}}>上次播放：</p>
                    </div>
                    {
                        videoInfo &&
                        <div>
                            <p style={{lineHeight: "0.8rem",fontSize:"0.26rem"}}>
                                <span style={{display:"inline-block",height:"0.8rem",padding:"0.1rem",float:"left"}}>
                                <Icon type={ClockSVG} size="xs" style={{color:"#108EE9"}} />
                                </span>
                                <span style={{lineHeight:"0.8rem",display:"inline-block",float:"left"}}>
                                    <Link to={{pathname:"/videoplay",query:videoInfo.LessonUrl}} className="linkInit"> {videoInfo.LessonName}</Link>
                                </span>
                            </p>
                        </div>
                    }
                    {
                        !videoInfo &&
                        <div>
                            <p style={{lineHeight: "0.8rem",fontSize:"0.26rem"}}>
                                <span style={{display:"inline-block",height:"0.8rem",padding:"0.1rem",float:"left"}}>
                                <Icon type={ClockSVG} size="xs" style={{color:"#108EE9"}} />
                                </span>
                                <span style={{lineHeight:"0.8rem",display:"inline-block",float:"left"}}>
                                    <Link className="linkInit"> 暂无播放记录 </Link>
                                </span>
                            </p>
                        </div>
                    }
                </div>
            </div>
            }
        </div>
    );
};

export default headStat;