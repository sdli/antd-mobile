import Reply from "../components/messages/reply.message";
import React from "react";
import { connect } from 'dva';

class XindePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Reply title="心得体会" />
            </div>
        );
    }    
}

export default connect()(XindePage);