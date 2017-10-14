import AndroidPlayer from "../videos/android.video";
import CommonPlayer from "../videos/common.video";
import IOSPlayer from "../videos/ios.video";
import React from "react";
import { Tabs, WhiteSpace, Badge, List,Radio,Button, Flex, } from 'antd-mobile';
import styles from "./layout.css";
import CommentList from "../messages/comments.message";
import {setLocalStore, getLocalStore} from "../../utils/setLocalStore";

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
        const {dispatch,LessonId,CourseId,TestIndex,close,RightAnswer} = this.props;
        if(Answer == ""){
            alert("请选择一个答案！");
        }else{
            dispatch({type:"user/testcase",bodyObj:{
                CourseId: CourseId,
                LessonId: LessonId,
                TestIndex: TestIndex,
                Answer: Answer,
                RightAnswer: RightAnswer,
                reqType: "testcase"
            }});
            close();
        }
    }

    render(){
        const {close,content,title,dispatch,commitedAnswer,RightAnswer} = this.props;
        const AnswerInit = ["A","B","C","D","E","F","G","H"];
        const value = this.state.value;
        return (
            <div className={styles.sheetDiv}>
                <div className={styles.sheetMask}></div>
                <div className={styles.sheetContent}>
                    <List renderHeader={() => title}>
                        {content.map((val,index)=>(
                            <RadioItem  key={index}  wrap checked={value === AnswerInit[index]} onChange={() => this.onChange(AnswerInit[index])}>
                                {val}
                            </RadioItem>
                        ))}
                    </List>
                </div>
                <div className={styles.sheetFooter}>
                    <div>
                        <Button inline style={{width: "50%",border:"0",fontSize:"0.28rem" }} onClick={close}>关闭窗口</Button>
                        <Button type="ghost" inline  style={{width: "50%",border:"0",fontSize:"0.28rem" }} onClick={this.submit} disabled={commitedAnswer==RightAnswer}>提交答案</Button>
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
        this.handleChange = this.handleChange.bind(this);
    }

    showSheet(answer,title,Index,CommitedAnswer,RightAnswer){
        const showFunc = function(){
            this.setState({
                showSheet: true,
                answer: answer,
                title: title,
                CommitedAnswer: CommitedAnswer,
                TestIndex: Index,
                RightAnswer: RightAnswer
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

    handleChange(key){
        if(key == 2){
            const {dispatch,LessonId,CourseId} = this.props;
            dispatch({type:"user/checkLessonMsg",bodyObj:{
                LessonId: LessonId,
                CourseId: CourseId,
                reqType: "checkLessonMsg"
            }});
        }
    }

    render(){
        const that = this;
        const {CollectList,TestList,dispatch,LessonId,CourseId,LessonMsg} = this.props;
        console.log(CollectList,TestList);
        return(
            <div>
                <Tabs defaultActiveKey="1" animated={false} swipeable={false} onChange={this.handleChange}>
                    <TabPane tab="课程积分"  key="1" >
                        <div style={{  width:"100%", backgroundColor: '#fff' }} >
                            <List renderHeader={() => '课程收获（播放中点击弹窗获得）'} className="my-list" style={{width:"100%",overflow:"hidden",borderBottom: "1px solid #ddd"}}>
                                {CollectList.map(function(val,index){
                                    return (
                                        <Item extra={val.Status?<span style={{color:"green"}}>{val.Score+"分"}</span>:"未收藏"} multipleLine align="center" key={index} wrap style={{fontSize:"0.20rem !important"}}>
                                            {val.CollectCnt}
                                        </Item>
                                    );
                                })}
                            </List>
                            <div className="divider"></div>
                            <List renderHeader={() => '问卷测评（请点击题目答题）'} className="my-list" style={{width:"100%",overflow:"hidden",borderBottom: "1px solid #ddd"}}>
                                {TestList.map(function(val,index){
                                    var test = JSON.parse(val.TestProblem);
                                    return (
                                        <Item 
                                            extra={(val.CommitedAnswer == val.Answer)?<span style={{color:"green"}}>{val.Score}分</span>:"0分"} 
                                            multipleLine 
                                            align="center" 
                                            key={index} 
                                            wrap 
                                            style={{fontSize:"0.20rem"}} 
                                            onClick={that.showSheet(test.answer,test.question,val.TestIndex,val.CommitedAnswer,val.Answer)}
                                        >
                                            {test.question}
                                        </Item>
                                    );
                                })}
                            </List>
                        </div>
                        <div style={{background:"#f0f0f0f",padding:"0.32rem 0.32rem"}}>
                            <div style={{background:"#ffffff",border:"1px solid #eee",borderRadius:"6px"}}>
                                <p style={{padding:"0.16rem",lineHeight:"0.32rem",color:"#4d4d4d",fontSize:"0.22rem"}}>
                                    <span style={{fontWeight:"bold"}}>课程得分方法</span> <br/>
                                    您可以通过“课程收获”和“问卷测评”来获得您的成绩，详细介绍：<br />
                                    1. ”课程收获“是指课程播放过程中，您留意手机的弹窗，点击“确定”按钮，即可收藏；（注意：点击取消或者关闭网页不会获得收藏得分）<br />
                                    2. ”问卷测评“是指课程播放完成或播放中，您可以点击问题来打开问卷内容，选择您的答案后，点击提交，即可获得相应积分。（注意：点击取消或者关闭网页不会获得收藏得分）<br />
                                    成绩达到60分时，表示该课程通过考核。<br />
                                </p>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane  tab="留言评论" key="2">
                        <div style={{ width:"100%", backgroundColor: '#fff' }} >
                            <CommentList CourseId={CourseId} LessonId={LessonId} LessonMsg={LessonMsg}/>
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
                    RightAnswer={this.state.RightAnswer}
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
        const {lessonInfo,CourseId, LessonId ,VideoId} = this.props;
        this.setState({
            show:false
        });
        setLocalStore("videoHistory",JSON.stringify({
            LessonName: lessonInfo?lessonInfo.LessonName:"暂无课程",
            LessonUrl: {
                LessonId: LessonId,
                VideoId: VideoId,
                CourseId: CourseId
            }
        }),3600*24*90);
    }

    render(){
        const {lessonDetails, CourseId, LessonId ,VideoId,lessonInfo,dispatch,LessonMsg} = this.props;
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
                            LessonMsg={LessonMsg}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default Videoplayer;




