import React from "react";
import { connect } from 'dva';
import {Button} from "antd-mobile";
class PayPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {dispatch} = this.props;
        return(
            <div>
                <p>支付页面</p>
                <p>订单号："50008,50009"</p>
                <p>openid: (前端api接口获取)</p>
                <p>支付金额: ￥0.01 元</p>
                <Button className="btn" type="primary" onClick={()=>{dispatch({type:"user/getPreIdAndPay",bodyObj:{reqType:"getPrePay",CourseId:"50008,50009",Money:"1"}})}}>发起支付</Button>
            </div>
        );
    }
}

export default connect()(PayPage);