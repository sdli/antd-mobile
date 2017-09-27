import { Tabs, WhiteSpace, Badge,Icon } from 'antd-mobile';
import styles from "./style.css";
import logo from "../../assets/imgs/logo.png";

const TabPane = Tabs.TabPane;
const paySelector = ({callBack,courseList}) => (
    <div>
        <Tabs defaultActiveKey="1" onChange={callBack}>
        <TabPane tab={<Badge>订购整套</Badge>} key="1">
            <div className={styles.paySelectDiv}>
                <img src={logo} />
                <div className={styles.paySelectDiv1}>
                    <p>订购全套</p>
                    <p><del>原价：￥360.00</del>，整套价格：￥299.00</p>
                </div>
                <div className={styles.paySelectDiv2}>
                    <Icon type="check-circle-o" />
                </div>
            </div>
        </TabPane>
        <TabPane tab={<Badge>分课程订购</Badge>} key="2">
            {
                courseList.map(function(val){
                    return (
                        <div className={styles.paySelectDiv}>
                            <img src={logo} />
                            <div className={styles.paySelectDiv1}>
                                <p>{val.CourseName}</p>
                                <p>课程单价：￥{val.LessonNum*8}</p>
                            </div>
                            <div className={styles.paySelectDiv2} onClick={()=>{console.log("clicked");}}>
                                <Icon type="check-circle-o" />
                            </div>
                        </div>
                    );
                })
            }
        </TabPane>
        </Tabs>
    </div>
);
  
export default paySelector;