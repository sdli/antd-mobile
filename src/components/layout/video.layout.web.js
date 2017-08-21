import AndroidPlayer from "../videos/android.video";
import CommonPlayer from "../videos/common.video";
import IOSPlayer from "../videos/ios.video";
import React from "react";
import { Tabs, WhiteSpace, Badge, List,Radio,Button, Flex, } from 'antd-mobile';
import styles from "./layout.css";
import CommentList from "../messages/comments.message";

const TabPane = Tabs.TabPane;
const Item = List.Item;
const RadioItem  = Radio.RadioItem;
const scoreList = [
    {title:"家庭教育的核心是是家长",score:"75"},
    {title:"家庭教育的核心是是家长",score:"未得分"},
    {title:"家庭教育的核心是是家长",score:"95"},
    {title:"家庭教育的核心是是家长",score:"45"},
    {title:"家庭教育的核心是是家长",score:"85"}
];

class Sheet extends React.Component{
    state = {
        value: 0
    };
    onChange = (value) => {
        console.log('checkbox',value);
        this.setState({
            value,
        });
    };
    render(){
        const data = [
            { value: 1, label: '1. 以身作则，教育孩子' },
            { value: 2, label: '2. 先打一顿再说' }
        ];
        const {close,submit} = this.props;
        
        const value = this.state.value;
        return (
            <div className={styles.sheetDiv}>
                <div className={styles.sheetMask}></div>
                <div className={styles.sheetContent}>
                    <List renderHeader={() => '以下哪个选项是正确的？'}>
                        {data.map((i)=>(
                            <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                                {i.label}
                            </RadioItem>
                        ))}
                    </List>
                </div>
                <div className={styles.sheetFooter}>
                    <div>
                        <Button inline style={{width: "50%",border:"0",fontSize:"0.28rem" }} onClick={close}>关闭窗口</Button>
                        <Button type="ghost" inline  style={{width: "50%",border:"0",fontSize:"0.28rem" }} onClick={submit}>提交答案</Button>
                    </div>
                </div>
            </div>
        );
    }
}

class TabExample extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showSheet: false
        }
    }

    showSheet(that){
        return function(){
            that.setState({
                showSheet: true
            });
        }
    }

    submitSheet(that){
        return function(){
            console.log("close");
            that.setState({
                showSheet: false
            });
        }
    }

    render(){
        const that = this;
        return(
            <div>
                <Tabs defaultActiveKey="1" animated={false} swipeable={false}>
                    <TabPane tab="课程积分"  key="1" >
                        <div style={{  width:"100%", backgroundColor: '#fff' }} >
                            <List renderHeader={() => '课程收获'} className="my-list" style={{width:"100%",overflow:"hidden",borderBottom: "1px solid #ddd"}}>
                                {scoreList.map(function(val,index){
                                    return (
                                        <Item extra={val.score} multipleLine align="center" wrap style={{fontSize:"0.20rem !important"}}>
                                            {(index+1)+". "+val.title}
                                        </Item>
                                    );
                                })}
                            </List>
                            <List renderHeader={() => '问卷得分'} className="my-list" style={{width:"100%",overflow:"hidden",borderBottom: "1px solid #ddd"}}>
                                {scoreList.map(function(val,index){
                                    return (
                                        <Item extra={val.score} multipleLine align="center" wrap style={{fontSize:"0.20rem"}} onClick={that.showSheet(that)}>
                                            {(index+1)+". "+val.title}
                                        </Item>
                                    );
                                })}
                            </List>
                        </div>
                    </TabPane>
                    <TabPane  tab="留言评论" key="2">
                        <div style={{ width:"100%", backgroundColor: '#fff' }} >
                            <CommentList />
                        </div>
                    </TabPane>
                </Tabs>
                <WhiteSpace />
                {this.state.showSheet && <Sheet close={that.submitSheet(that)} submit={that.submitSheet(that)} />}
            </div>
        );
    }
}

class Videoplayer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <CommonPlayer />
                <div className="divider" />
                <TabExample />
            </div>
        );
    }
}

export default Videoplayer;




