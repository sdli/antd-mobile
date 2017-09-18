import React from "react";
import { Button, Flex, WingBlank } from 'antd-mobile';
import {hashHistory} from "react-router";
import Footer from "./footer.card";

class LoginSelect extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={{padding: "2rem 0.32rem"}}>
                <p style={{lineHeight:"1rem",textAlign:"center",color:"#4d4d4d"}}>选择您的登录方式</p>
                <Button className="btn" type="primary" size="small" onClick={()=>hashHistory.push("/login")}>已有账号（登录）</Button>
                <div style={{height:"0.32rem"}}>
                </div>
                <Button className="btn" size="small" onClick={()=>hashHistory.push("/register")}>
                    没有账户（注册）
                </Button>
                <Footer />
            </div>
        );
    }
}


export default LoginSelect;