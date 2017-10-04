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
                <p style={{textAlign:"center",lineHeight:"2rem",fontSize:"0.28rem"}}>加载微信支付中，请稍后...</p>
            </div>
        );
    }
}

export default connect()(GetOpenid);