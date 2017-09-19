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
        const {LessionList,CourseId} = this.props;
        return(
                  <ul className={styles.lessionUl}>
                        {LessionList !== "undefined" && LessionList.map((val)=>{
                            return (
                                <li>
                                    <Link to={{pathname:"/videoplay?CourseId="+CourseId+"&LessonId="+val.LessonId}} className="linkInit">
                                        <Icon type={VideoSvg}/>
                                        <div className={styles.lessionUlTitle}>
                                            <p>{val.Description}</p>
                                            <p>时长：32分钟</p>
                                        </div>
                                        <div className={styles.lessionUlFunc}>
                                                <p style={{lineHeight:"1rem",textAlign:"center",width:"100%",display:"block"}}>{val.LessonScore}<span className={styles.lessionUlSpan}>分</span></p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
        );
    }
}

export default listUl;