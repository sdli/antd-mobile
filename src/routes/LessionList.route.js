import LessonList from "../components/cards/lessionList.card";
import React,{Component} from "react";
import { connect } from 'dva';
import getQuery from "../components/tools/getQuery";

class lessonList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const data = getQuery(this.props,"CourseId");
        const {user} = this.props;
        console.log(user);
        return (
            <div>
                <LessonList courseList={user.courses} CourseId={data} login={user.login} />
            </div>
        );
    }
}

export default connect(({user})=>({user}))(lessonList);