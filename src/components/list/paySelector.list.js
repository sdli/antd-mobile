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
            courseList: [],
            full: true,
            fullList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleCourse = this.toggleCourse.bind(this);
        this.callPay      = this.callPay.bind(this);
    }

    handleChange(key){
        console.log(this.state);
        if(key == 1){
            this.setState({price_show: this.state.price,full: true});
        }else{
            this.setState({price_show: this.state.price_single,full:false});
        }
    }

    componentWillMount(){
        const {courseList,notFull} = this.props;
        let arr = [];
        let tempArr = [];
        let tempArr1 = [];
        let price_single = 0;
        for(var i =0;i < courseList.length; i++){
            if(courseList[i] != 0){
                arr.push({
                    courseId: courseList[i].CourseId,
                    selected: true,
                    lessonMum: courseList[i].LessonList.length
                });
                price_single += parseInt(courseList[i].LessonList.length)*8;
            }
            tempArr.push(courseList[i].CourseId);
            tempArr1.push(courseList[i].CourseId);
        }
        this.setState({
            courseList: arr,
            fullList: tempArr,
            notFullList: tempArr1,
            price_single: price_single,
            price_show: notFull?price_single:299
        });
    }

    toggleCourse(courseId){
        const id = courseId;
        const that = this;
        return function(){
            const dom = that["select"+courseId];
            let arr = JSON.parse(JSON.stringify(that.state.notFullList));
            const list = that.state.courseList.map(function(val){
                    if(val.courseId == id){
                        dom.style.display = val.selected?"none":"block";
                        !val.selected?arr.push(val.courseId):arr.splice(arr.indexOf(val.courseId),1);
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
                price_show: price,
                notFullList: arr
            });
        }
    }

    callPay(){
        const {dispatch} = this.props;
        var courseStr = this.state.full?this.state.fullList.join(","):this.state.notFullList.join(",");
        console.log(courseStr);
        if(parseInt(this.state.price_show) != 0){
            console.log({
                reqType:"getPrePay",
                CourseId:courseStr,
                Money: parseInt(this.state.price_show)*100
            });
            dispatch({
                type:"user/getPreIdAndPay",
                bodyObj:{
                    reqType:"getPrePay",
                    CourseId:courseStr,
                    Money: 1
                }
            });
        }else{
            alert("所选课程不能为空！");
        }
    }

    render(){
        const {callBack,courseList,dispatch,notFull} = this.props;
        const that = this;
        return (
            <div>
                <Tabs defaultActiveKey={notFull?"2":"1"} onChange={that.handleChange}>
                    {
                        !notFull 
                        &&
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
                    }
                    <TabPane tab={<Badge>分课程订购</Badge>} key="2">
                        {
                            courseList.map(function(val,index){
                                if(val != 0){
                                    return (
                                        <div className={styles.paySelectDiv} key={index} onClick={that.toggleCourse(val.CourseId)} >
                                            <img src={val.HeadPortrait} />
                                            <div className={styles.paySelectDiv1}>
                                                <p>{val.CourseName}</p>
                                                <p>课程单价：￥{parseInt(val.LessonList.length)*8}</p>
                                            </div>
                                            <div className={styles.paySelectDiv2} ref={(id)=>{that['select'+ val.CourseId] = id;}}>
                                                <Icon type="check-circle-o" />
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        }
                    </TabPane>
                </Tabs>
                <div className="divider"></div>
                <div style={{padding:"0.32rem 0.16rem"}}>
                    <p style={{lineHeight:"0.8rem",fontSize:"0.26rem",color:"#999999",textAlign:"center"}}>待支付金额：{this.state.price_show}</p>
                    <Button className="btn" type="primary" onClick={this.callPay}>发起支付</Button>
                </div>
            </div>
        );
    }
}

export default paySelector;