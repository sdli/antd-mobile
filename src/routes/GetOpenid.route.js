import React from "react";
import { connect } from 'dva';
import getQuery from "../components/tools/getQuery";

class GetOpenid extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {dispatch} = this.props;
        const code = getQuery(this.props,"code");
        dispatch({type:"user/getOpenid",bodyObj:{code:code,reqType:"getOpenid",url:"/pay"}});
    }

    render(){
        return(
            <div>
                <p>获取openid</p>
            </div>
        );
    }
}

export default connect()(GetOpenid);