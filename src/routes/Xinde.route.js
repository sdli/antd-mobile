import Reply from "../components/messages/opinion.message";
import React from "react";
import { connect } from 'dva';
import getQuery from "../components/tools/getQuery";

class XindePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const CourseId = getQuery(this.props,"CourseId");
        return(
            <div>
                <Reply title="心得体会" CourseId={CourseId} />
            </div>
        );
    }    
}

export default connect()(XindePage);