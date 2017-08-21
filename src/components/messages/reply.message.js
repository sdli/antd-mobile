import React from "react";
import { List, TextareaItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

class Reply extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div>
                <List renderHeader={() => 'Count'}>
                    <TextareaItem
                        {...getFieldProps('count', {
                        initialValue: '计数功能,我的意见是...',
                        })}
                        rows={5}
                        count={100}
                    />
                </List>
            </div>
        );
    }
}

const ReplyPage = createForm()(Reply);
export default ReplyPage;