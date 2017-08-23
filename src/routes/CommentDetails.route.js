import Details from "../components/messages/commentDetails.message";
import Reply from "../components/messages/reply.message";
import React from "react";
import { connect } from 'dva';

class CommentDetailsPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Details />
                <Reply title="输入您的回复"/>
            </div>
        );
    }    
}

export default connect()(CommentDetailsPage);