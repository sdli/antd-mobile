import React from "react";
import { connect } from 'dva';
import {Button} from "antd-mobile";
import PaySelector from "../components/list/paySelector.list";

class PayPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {dispatch,user} = this.props;
        return(
            <div>
                <PaySelector callBack={()=>{console.log("data");}} courseList={null}/>
                <div className="divider"></div>
                <Button className="btn" type="primary" onClick={()=>{dispatch({type:"user/getPreIdAndPay",bodyObj:{reqType:"getPrePay",CourseId:"50008,50009",Money:"1"}})}}>发起支付</Button>
            </div>
        );
    }
}

export default connect(({user})=>({user}))(PayPage);