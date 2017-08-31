import styles from "./card.style.less";
import {Icon} from "antd-mobile";
import ClockSVG from "../../assets/svgs/clock-o.svg";
import {Link} from "react-router";

console.log(React);
const headStat = function(lessons,timeLength){
    return (
        <div className={styles.headStat}>
            <div className={styles.headStatCell} style={{borderRight:"1px solid #f0f0f0"}}>
                <p>完成课程</p>
                <p><span>5</span>/36课时</p>
            </div>
            <div className={styles.headStatCell}>
                <p>平均得分</p>
                <p><span>87</span>分</p>
            </div>
            <div className={styles.headStatRecord}>
                <div>
                    <p style={{lineHeight: "0.8rem"}}>上次播放：</p>
                </div>
                <div>
                    <p style={{lineHeight: "0.8rem",fontSize:"0.26rem"}}>
                        <span style={{display:"inline-block",height:"0.8rem",padding:"0.1rem",float:"left"}}>
                           <Icon type={ClockSVG} size="xs" style={{color:"#108EE9"}} />
                        </span>
                        <span style={{lineHeight:"0.8rem",display:"inline-block",float:"left"}}>
                            <Link to="/videoplay" className="linkInit"> 家庭教育核心观念，第四讲。</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default headStat;