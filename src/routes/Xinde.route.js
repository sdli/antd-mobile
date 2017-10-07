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
        const {dispatch} = this.props;
        return(
            <div>
                <Reply title="心得体会" CourseId={CourseId} dispatch={dispatch} />
            </div>
        );
    }    
}

export default connect()(XindePage);