import Details from "../components/messages/commentDetails.message";
import Reply from "../components/messages/reply.message";
import React from "react";

class CommentDetailsPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Details />
                <Reply />
            </div>
        );
    }    
}

export default CommentDetailsPage;