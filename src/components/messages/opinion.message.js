import React from "react";
import { List, TextareaItem, WhiteSpace,Button } from 'antd-mobile';
import { createForm } from 'rc-form';

class Reply extends React.Component{
    constructor(props){
        super(props);
        this.leaveMsg = this.leaveMsg.bind(this);
    }

    leaveMsg(){
        const {dispatch,CourseId} = this.props;
        const form = this.props.form;
        form.validateFields((error,values) => {
            if(values.message.length >= 10 && values.message.length < 200){
                console.log(values.message);
                dispatch({type:"user/leaveOpinion",bodyObj:{
                    CourseId: CourseId,
                    Opinion: values.message,
                    reqType: "courseOpinion"
                }});
            }else{
                alert("心得请在10至200字以内。");
            }
        });
    }

    render(){
        const { getFieldProps } = this.props.form;
        const { title } = this.props;
        return(
            <div style={{padding:"0.16rem",margin:"0.16rem",border:"1px solid #ddd"}}>
                <List renderHeader={() => title}>
                    <TextareaItem
                        {...getFieldProps('message', {
                        initialValue: '',
                        })}
                        rows={6}
                        placeholder="请输入您的学习心得..."
                        count={300}
                    />
                </List>
                <p style={{margin:"32px 0",padding:"0.5rem 16px"}} >
                    <Button type="primary" size="small" onClick={this.leaveMsg}>立即提交</Button>
                </p>
            </div>
        );
    }
}

const ReplyPage = createForm()(Reply);
export default ReplyPage;