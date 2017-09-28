import { Tabs, WhiteSpace, Badge,Icon,Button } from 'antd-mobile';
import styles from "./style.css";
import logo from "../../assets/imgs/logo.png";
import React from "react";

const TabPane = Tabs.TabPane;

class paySelector extends React.Component{
    constructor(props){
        super(props);
        this.state={
            price: 299,
            price_single: 299,
            price_show: 299,
            courseList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleCourse = this.toggleCourse.bind(this);
    }

    handleChange(key){
        console.log(this.state);
        if(key == 1){
            this.setState({price_show: this.state.price});
        }else{
            this.setState({price_show: this.state.price_single});
        }
    }

    componentDidMount(){
        const {courseList} = this.props;
        let arr = [];
        for(var i =0;i < courseList.length; i++){
            arr.push({
                courseId: courseList[i].CourseId,
                selected: true,
                lessonMum: courseList[i].LessonList.length 
            });
        } 
        this.setState({
            courseList: arr
        });
    }

    toggleCourse(courseId){
        const id = courseId;
        const that = this;
        return function(){
            const dom = that["select"+courseId];
            const list = that.state.courseList.map(function(val){
                    if(val.courseId == id){
                        dom.style.display = val.selected?"none":"block"; 
                        return {
                            courseId: val.courseId,
                            selected: !val.selected,
                            lessonMum: val.lessonMum 
                        }
                    }else{
                        return val;
                    }
            });
            console.log(list);
            const price = list.reduce((p,c)=>{
                const cVal = c.selected?c.lessonMum:0;
                console.log((cVal)*8);
                return p+(cVal)*8;
            },0);

            console.log(price);
            that.setState({
                courseList: list,
                price_single: price,
                price_show: price
            });
        }
    }


    render(){
        const {callBack,courseList,dispatch} = this.props;
        const that = this;
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={that.handleChange}>
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
                            courseList.map(function(val,index){
                                return (
                                    <div className={styles.paySelectDiv} key={index} onClick={that.toggleCourse(val.CourseId)} >
                                        <img src={logo} />
                                        <div className={styles.paySelectDiv1}>
                                            <p>{val.CourseName}</p>
                                            <p>课程单价：￥{parseInt(val.LessonList.length)*8}</p>
                                        </div>
                                        <div className={styles.paySelectDiv2} ref={(id)=>{that['select'+ val.CourseId] = id;}}>
                                            <Icon type="check-circle-o" />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </TabPane>
                </Tabs>
                <div className="divider"></div>
                <div style={{padding:"0.32rem 0.16rem"}}>
                    <p style={{lineHeight:"0.6rem"}}>支付金额：{this.state.price_show}</p>
                    <Button className="btn" type="primary" onClick={()=>{dispatch({type:"user/getPreIdAndPay",bodyObj:{reqType:"getPrePay",CourseId:"50008,50009",Money:"1"}})}}>发起支付</Button>
                </div>
            </div>
        );
    }
}
 
export default paySelector;