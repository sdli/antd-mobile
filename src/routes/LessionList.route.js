import LessonList from "../components/cards/lessionList.card";
import React,{Component} from "react";
import getQuery from "../components/tools/getQuery";

class lessonList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const data = getQuery(this.props,"name");
        console.log(data);
        return (
            <div>
                <LessonList />
            </div>
        );
    }
}

export default lessonList;