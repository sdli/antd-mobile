import React from "react";
import { List, TextareaItem, WhiteSpace,Button } from 'antd-mobile';
import { createForm } from 'rc-form';

class Reply extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div>
                <List renderHeader={() => '在此输入您的回复'}>
                    <TextareaItem
                        {...getFieldProps('count', {
                        initialValue: '',
                        })}
                        rows={6}
                        count={300}
                    />
                </List>
                <p style={{margin:"32px 0",padding:"0.5rem 16px"}} ><Button type="primary" size="small">提交留言</Button></p>
            </div>
        );
    }
}

const ReplyPage = createForm()(Reply);
export default ReplyPage;