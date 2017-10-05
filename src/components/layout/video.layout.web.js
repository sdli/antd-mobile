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
    constructor(props){
        super(props);
        this.state={
            value: this.props.commitedAnswer
        }
        this.submit = this.submit.bind(this);
    }

    onChange = (value) => {
        console.log('checkbox',value);
        this.setState({
            value,
        });
    };

    submit(){
        var Answer = this.state.value;
        const {dispatch,LessonId,CourseId,TestIndex} = this.props;
        if(Answer == ""){
            alert("请选择一个答案！");
        }else{
            dispatch({type:"user/testcase",bodyObj:{
                CourseId: CourseId,
                LessonId: LessonId,
                TestIndex: TestIndex,
                Answer: Answer
            }});
        }
    }

    render(){
        const {close,content,title,dispatch,commitedAnswer} = this.props;
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
                        <Button type="ghost" inline  style={{width: "50%",border:"0",fontSize:"0.28rem" }} onClick={this.submit}>提交答案</Button>
                    </div>
                </div>
            </div>
        );
    }
}

class VideoTests extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showSheet: false,
        }
        this.closeSheet = this.closeSheet.bind(this);
    }

    showSheet(answer,title,Index,CommitedAnswer){
        const showFunc = function(){
            this.setState({
                showSheet: true,
                answer: answer,
                title: title,
                CommitedAnswer: CommitedAnswer,
                TestIndex: Index
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

    closeSheet(){
        this.setState({
            showSheet: false
        });
    }

    render(){
        const that = this;
        const {CollectList,TestList,dispatch,LessonId,CourseId} = this.props;
        console.log(CollectList,TestList);
        return(
            <div>
                <Tabs defaultActiveKey="1" animated={false} swipeable={false}>
                    <TabPane tab="课程积分"  key="1" >
                        <div style={{  width:"100%", backgroundColor: '#fff' }} >
                            <List renderHeader={() => '课程收获'} className="my-list" style={{width:"100%",overflow:"hidden",borderBottom: "1px solid #ddd"}}>
                                {CollectList.map(function(val,index){
                                    return (
                                        <Item extra={val.Status?<span style={{color:"green"}}>{val.Score+"分"}</span>:"未收藏"} multipleLine align="center" key={index} wrap style={{fontSize:"0.20rem !important"}}>
                                            {val.CollectCnt}
                                        </Item>
                                    );
                                })}
                            </List>
                            <List renderHeader={() => '问卷得分'} className="my-list" style={{width:"100%",overflow:"hidden",borderBottom: "1px solid #ddd"}}>
                                {TestList.map(function(val,index){
                                    var test = JSON.parse(val.TestProblem);
                                    return (
                                        <Item 
                                            extra={(val.CommitedAnswer == val.Answer)?<span style={{color:"green"}}>{val.Score}</span>:"0分"} 
                                            multipleLine 
                                            align="center" 
                                            key={index} 
                                            wrap 
                                            style={{fontSize:"0.20rem"}} 
                                            onClick={that.showSheet(test.answer,test.question,val.TestIndex,val.CommitedAnswer)}
                                        >
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
                {this.state.showSheet && 
                <Sheet 
                    close={this.closeSheet} 
                    dispatch={dispatch} 
                    TestIndex={this.state.TestIndex} 
                    LessonId={LessonId} 
                    CourseId={CourseId} 
                    content={this.state.answer} 
                    commitedAnswer={this.state.CommitedAnswer} 
                    title={this.state.title}
                />}
            </div>
        );
    }
}

class Videoplayer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: true
        }
        this.onStart = this.onStart.bind(this);
    }

    onStart = () =>{
        this.setState({
            show:false
        });
    }

    render(){
        const {lessonDetails, CourseId, LessonId ,VideoId,lessonInfo,dispatch} = this.props;
        return(
            <div>
                {
                    (JSON.stringify(lessonDetails) != "{}") &&
                    <div>
                        <CommonPlayer 
                            lessonInfo={lessonInfo} 
                            onStart={this.onStart} 
                            show={this.state.show} 
                            dispatch={dispatch} 
                            CollectList={lessonDetails.CollectInfoQueryReq.CollectList} 
                            VideoId={VideoId} 
                            CourseId={CourseId} 
                            LessonId={LessonId} 
                        />
                        <div className="divider" />
                        <VideoTests 
                            CollectList={lessonDetails.CollectInfoQueryReq.CollectList} 
                            TestList={lessonDetails.TestCaseQueryReq.TestList}
                            LessonId={LessonId}
                            CourseId={CourseId}
                            dispatch={dispatch}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default Videoplayer;




