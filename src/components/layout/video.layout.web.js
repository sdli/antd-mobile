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

class Sheet extends React.Component{
    state = {
        value: "A"
    };
    onChange = (value) => {
        console.log('checkbox',value);
        this.setState({
            value,
        });
    };
    render(){
        const {close,submit,content,title} = this.props;
        const AnswerInit = ["A","B","C","D","E","F","G","H"];
        const value = this.state.value;
        return (
            <div className={styles.sheetDiv}>
                <div className={styles.sheetMask}></div>
                <div className={styles.sheetContent}>
                    <List renderHeader={() => title}>
                        {content.map((val,index)=>(
                            <RadioItem key={index} checked={value === AnswerInit[index]} onChange={() => this.onChange(AnswerInit[index])}>
                                {val}
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
            showSheet: false,
        }
    }

    showSheet(answer,title){
        const showFunc = function(){
            this.setState({
                showSheet: true,
                answer: answer,
                title: title
            });
        }
        return showFunc.bind(this);
    }

    submitSheet(){
        const submitFunc = function(){
            console.log("close");
            this.setState({
                showSheet: false
            });
        }
        return submitFunc.bind(this);
    }

    render(){
        const that = this;
        const {CollectList,TestList} = this.props;
        console.log(colloctList,TestList);
        return(
            <div>
                <Tabs defaultActiveKey="1" animated={false} swipeable={false}>
                    <TabPane tab="课程积分"  key="1" >
                        <div style={{  width:"100%", backgroundColor: '#fff' }} >
                            <List renderHeader={() => '课程收获'} className="my-list" style={{width:"100%",overflow:"hidden",borderBottom: "1px solid #ddd"}}>
                                {CollectList.map(function(val,index){
                                    return (
                                        <Item extra={val.CollectIndex} multipleLine align="center" key={index} wrap style={{fontSize:"0.20rem !important"}}>
                                            {val.CollectCnt}
                                        </Item>
                                    );
                                })}
                            </List>
                            <List renderHeader={() => '问卷得分'} className="my-list" style={{width:"100%",overflow:"hidden",borderBottom: "1px solid #ddd"}}>
                                {TestList.map(function(val,index){
                                    var test = JSON.parse(val.TestProblem);
                                    return (
                                        <Item extra={val.TestIndex} multipleLine align="center" key={index} wrap style={{fontSize:"0.20rem"}} onClick={that.showSheet(test.answer,test.question)}>
                                            {test.question}
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
                {this.state.showSheet && <Sheet close={this.submitSheet()} submit={this.submitSheet()} content={this.state.answer} title={this.state.title}/>}
            </div>
        );
    }
}

class Videoplayer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {lessonDetails, CourseId, LessonId ,VideoId,lessonInfo,dispatch} = this.props;
        return(
            <div>
                {
                    (JSON.stringify(lessonDetails) != "{}") &&
                    <div>
                        <CommonPlayer lessonInfo={lessonInfo} dispatch={dispatch} CollectList={lessonDetails.CollectInfoQueryReq.CollectList} VideoId={VideoId} />
                        <div className="divider" />
                        <TabExample CollectList={lessonDetails.CollectInfoQueryReq.CollectList} TestList={lessonDetails.TestCaseQueryReq.TestList} />
                    </div>
                }
            </div>
        );
    }
}

export default Videoplayer;




