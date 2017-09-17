import React from "react";
import styles from "./layout.css";
import LoginBackImg from "../../assets/imgs/login_back.png";
import { Tabs, WhiteSpace, Badge,List, InputItem,Icon,Switch,Button} from 'antd-mobile';
import { createForm } from 'rc-form';
import UserSvg from "../../assets/svgs/user-o.svg";
import LockSvg from "../../assets/svgs/lock.svg";
import MesgSvg from "../../assets/svgs/commenting.svg";
import CodeImg from "../../assets/imgs/code.png";
import Footer from "../cards/footer.card";
import {hashHistory} from "react-router";

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log('onChange', key);
}

function handleTabClick(key) {
  console.log('onTabClick', key);
}

class LoginLayout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            codeError: false,
            phoneError: false,
            passwordError: false,
            phone1Error: false,
            code1Error: false
        }
    }

    trim(str) {
        return str.replace(/\s/g,"");
    }

    verifyType1(arr){
        var that =this;
        return arr.every(function(val,index){
            console.log(val);
            switch (index){
                case 0:
                    var phone = that.trim(val);
                    console.log(phone,phone.length);
                    if(phone.length != 11){
                        that.setState({
                            phoneError: true
                        });
                        return false;
                    }{
                        that.setState({
                            phoneError: false
                        });
                        return true;
                    }
                    break;
                case 1:
                    var password = val;
                    if(password && typeof password != null){
                        that.setState({
                            passwordError: false
                        });
                        return true;
                    }else{
                        that.setState({
                            passwordError: true
                        });
                        return false;
                    }
                case 2:
                    var code = val;
                    if(code){
                        that.setState({
                            codeError: false
                        });
                        return true;
                    }else{
                        that.setState({
                            codeError: true
                        });
                        return false;
                    }
            }
        })
    }

    verifyType2(arr){
        var that =this;
        return arr.every(function(val,index){
            console.log(val)
            switch (index){
                case 0:
                    var phone = that.trim(val);
                    if(phone.length != 11){
                        that.setState({
                            phone1Error: true
                        });
                        return false;
                    }{
                        that.setState({
                            phone1Error: false
                        });
                        return true;
                    }
                    break;
                case 1:
                    var code1 = val;
                    if(code1 && typeof code1 != null){
                        that.setState({
                            code1Error: false
                        });
                        return true;
                    }else{
                        that.setState({
                            code1Error: true
                        });
                        return false;
                    }
            }
        })
    }

    verifyType3(phone){
        var phone = this.trim(phone);
        if(phone.length != 11){
            this.setState({
                phone1Error: true
            });
            return false;
        }{
            this.setState({
                phone1Error: false
            });
            return true;
        }
    }

    submitType(type){
        var form = this.props.form;
        var method = this.props.loginMethod;
        var that = this;
        return function(){
                form.validateFields((error, value) => {
                    if(type == "password"){
                        if(that.verifyType1([value.phone,value.password,value.code])){
                            method.password({
                                Type: "1",
                                Phone: that.trim(value.phone),
                                PassWd: value.password,
                                code: value.code,
                                reqType: "TeacherLoginReq"
                            });
                        }
                    }else{
                        if(that.verifyType2([value.phone1,value.code1])){
                            method.code({
                                Phone: that.trim(value.phone1),
                                VerifyCode: value.code1,
                                reqType:"TeacherLoginReq",
                                Type: "2"
                            });
                        }
                    }
                });
        }
    }

    getVerifyCode(){
        var form = this.props.form;
        var methods = this.props.loginMethod;
        var that = this;
        return function(){
            form.validateFields((error,values) => {
                console.log(values);
                if(that.verifyType3(values.phone1)){
                    methods.getVerifyCode({Phone:that.trim(values.phone1),reqType: "VerifyCodeReq",Type:"2"});
                }
            });
        }
    }

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div className={styles.loginPage}>
                <img src={LoginBackImg}  />
                <div className={styles.loginContent}>
                    <p>教师成长系统登录</p>
                    <div className={styles.loginTab}>
                        <Tabs defaultActiveKey="1" onChange={callback} onTabClick={handleTabClick} swipeable={false}>
                        <TabPane tab={<span>密码登录</span>} key="1">
                            <div style={{padding:"0.5rem 0"}}>
                                <List>
                                    <InputItem
                                        {...getFieldProps('phone')}
                                        placeholder="手机号码"
                                        type="phone"
                                        error={this.state.phoneError}
                                    >
                                        <div style={{position:"relative",height:"0.88rem",padding:"0.24rem 0.04rem"}}>
                                            <Icon type={UserSvg} style={{width:"0.38rem",height:"0.38rem",color:"#4d4d4d"}}/>
                                        </div>
                                    </InputItem>
                                    <InputItem
                                        {...getFieldProps('password')}
                                        placeholder="账号密码"
                                        type="password"
                                        error={this.state.passwordError}
                                    >
                                        <div style={{position:"relative",height:"0.88rem",padding:"0.24rem 0"}}>
                                            <Icon type={LockSvg} style={{width:"0.44rem",height:"0.44rem",color:"#4d4d4d"}}/>
                                        </div>
                                    </InputItem>
                                    <InputItem
                                        {...getFieldProps('code')}
                                        placeholder="验证码"
                                        error={this.state.codeError}
                                        extra={<img src={"/api/verifycode"} style={{width:"2rem",height:"0.5rem"}} />}
                                    >
                                       <div style={{position:"relative",height:"0.88rem",padding:"0.24rem 0"}}>
                                            <Icon type={MesgSvg} style={{width:"0.38rem",height:"0.38rem",color:"#4d4d4d"}}/>
                                        </div>
                                    </InputItem>
                                    <div style={{height:"2rem",padding:"0.32rem 1.8rem 0.32rem 0.16rem",textAlign:"right",position:"relative"}}>
                                        <p style={{lineHeight:"1.36rem",width:"100%",float:"left",fontSize:"0.26rem",fontWeight:"lighter"}}>绑定此微信，自动登录</p>
                                        <div style={{position:"absolute",width:"1.6rem",top:"0.8rem",right:"0.16rem"}}>
                                            <Switch
                                                    {...getFieldProps('Switch1', {
                                                        initialValue: true,
                                                        valuePropName: 'checked',
                                                    })}
                                                    onClick={(checked) => { console.log(checked); }}
                                                    platform="android"
                                            />
                                        </div>
                                        <div style={{clear:"both"}}></div>
                                    </div>
                                     <div style={{padding:"0.16rem 0.32rem"}}>
                                        <Button className="btn" type="primary" size="small" onClick={this.submitType("password")}>登  录</Button>
                                     </div>
                                </List>
                                <p style={{lineHeight:"0.88rem",fontSize:"0.24rem",textAlign:"center",color:"#4d4d4d"}}>如忘记密码，可使用手机验证码登录。</p>
                            </div>
                        </TabPane>
                        <TabPane tab={<Badge>验证码登录</Badge>} key="2">
                            <div style={{padding:"0.5rem 0"}}>
                                <List>
                                    <InputItem
                                        {...getFieldProps('phone1')}
                                        placeholder="手机号码"
                                        type="phone"
                                        error={this.state.phone1Error}
                                    >
                                        <div style={{position:"relative",height:"0.88rem",padding:"0.24rem 0.04rem"}}>
                                            <Icon type={UserSvg} style={{width:"0.38rem",height:"0.38rem",color:"#4d4d4d"}}/>
                                        </div>
                                    </InputItem>
                                    <InputItem
                                        {...getFieldProps('code1')}
                                        placeholder="验证码"
                                        error={this.state.code1Error}
                                        extra={<Button type="ghost" size="small" inline onClick={this.getVerifyCode()}>获取验证码</Button>}
                                    >
                                       <div style={{position:"relative",height:"0.88rem",padding:"0.24rem 0"}}>
                                            <Icon type={MesgSvg} style={{width:"0.38rem",height:"0.38rem",color:"#4d4d4d"}}/>
                                        </div>
                                    </InputItem>
                                    <div style={{height:"2rem",padding:"0.32rem 1.8rem 0.32rem 0.16rem",textAlign:"right",position:"relative"}}>
                                        <p style={{lineHeight:"1.36rem",width:"100%",float:"left",fontSize:"0.26rem",fontWeight:"lighter"}}>绑定此微信，自动登录</p>
                                        <div style={{position:"absolute",width:"1.6rem",top:"0.8rem",right:"0.16rem"}}>
                                            <Switch
                                                    {...getFieldProps('Switch1', {
                                                        initialValue: true,
                                                        valuePropName: 'checked',
                                                    })}
                                                    onClick={(checked) => { console.log(checked); }}
                                                    platform="android"
                                            />
                                        </div>
                                        <div style={{clear:"both"}}></div>
                                    </div>
                                     <div style={{padding:"0.16rem 0.32rem"}}>
                                        <Button className="btn" type="primary" size="small" onClick={this.submitType("code")}>登  录</Button>
                                     </div>
                                </List>
                                <p style={{lineHeight:"0.88rem",fontSize:"0.24rem",textAlign:"center",color:"#4d4d4d"}}>如忘记密码，可使用手机验证码登录。</p>
                            </div>
                        </TabPane>
                        </Tabs>
                        <WhiteSpace />
                    </div>
                </div>
                <Footer style={{backgroundColor:"#f6f6f6"}}/>
            </div>
        );
    }
}

const LoginPage = createForm()(LoginLayout);

export default LoginPage;