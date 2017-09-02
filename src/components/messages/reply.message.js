import React from "react";
import { List, TextareaItem, WhiteSpace,Button } from 'antd-mobile';
import { createForm } from 'rc-form';

class Reply extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { getFieldProps } = this.props.form;
        const { title } = this.props;
        return(
            <div style={{padding:"0.16rem",margin:"0.16rem",border:"1px solid #ddd"}}>
                <List renderHeader={() => title}>
                    <TextareaItem
                        {...getFieldProps('count', {
                        initialValue: '请输入...',
                        })}
                        rows={6}
                        count={300}
                    />
                </List>
                <p style={{margin:"32px 0",padding:"0.5rem 16px"}} ><Button type="primary" size="small">立即提交</Button></p>
            </div>
        );
    }
}

const ReplyPage = createForm()(Reply);
export default ReplyPage;