import React from "react";
import styles from "./layout.css";
import LoginBackImg from "../../assets/imgs/login_back.png";
import { Tabs, Picker, WhiteSpace, Badge,List, InputItem,Icon,Switch,Button} from 'antd-mobile';
import { createForm } from 'rc-form';
import UserSvg from "../../assets/svgs/user-o.svg";
import LockSvg from "../../assets/svgs/lock.svg";
import MesgSvg from "../../assets/svgs/commenting.svg";
import CodeImg from "../../assets/imgs/code.png";
import Footer from "../cards/footer.card";
import {hashHistory,Link} from "react-router";
import district from "./lib/codeList";
import MapMarker from "../../assets/svgs/map-marker.svg";
import AddressCard from "../../assets/svgs/address-card-o.svg";

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log('onChange', key);
}

function handleTabClick(key) {
  console.log('onTabClick', key);
}

class RegisterLayout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            codeError: false,
            phoneError: false,
            passwordError: false
        }
    }

    trim(str) {
        return str.replace(/\s/g,"");
    }

    verifyType1(arr){
        var that =this;
        return arr.every(function(val,index){
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
                case 2:
                    var password = val;
                    if(password && typeof password != null && password.length <= 16 && password.length >=8){
                        that.setState({
                            passwordError: false
                        });
                        return true;
                    }else{
                        that.setState({
                            passwordError: true
                        });
                        return false;
                    };
                case 1:
                    var code = val;
                    if(code && typeof code != null){
                        that.setState({
                            codeError: false
                        });
                        return true;
                    }else{
                        that.setState({
                            codeError: true
                        });
                        return false;
                    };
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

    submitType(){
        var form = this.props.form;
        var method = this.props.registerMethod;
        var that = this;
        return function(){
                form.validateFields((error, value) => {
                    if(that.verifyType1([value.phone1,value.code1,value.password1])){
                        method.register({
                            Phone: that.trim(value.phone1),
                            PassWd: value.password1,
                            VerifyCode: value.code1,
                            AreaId: value.district[1],
                            Iden: value.Iden[0],
                            reqType: "RegisterReq"
                        });
                    }
                });
        }
    }

    getVerifyCode(){
        var form = this.props.form;
        var methods = this.props.registerMethod;
        var that = this;
        return function(){
            form.validateFields((error,values) => {
                console.log(values);
                if(that.verifyType3(values.phone1)){
                    methods.getVerifyCode({Phone:that.trim(values.phone1),reqType: "VerifyCodeReq",Type:"1"});
                }
            });
        }
    }

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div className={styles.loginPage}>
                <div className={styles.loginContent}>
                    <p style={{color:"#4d4d4d"}}>用户注册</p>
                    <div className={styles.loginTab}>
                        <Tabs defaultActiveKey="1" onChange={callback} onTabClick={handleTabClick} swipeable={false}>
                        <TabPane tab={<Badge>请使用手机号注册</Badge>} key="1">
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
                                        error={this.state.codeError}
                                        extra={<Button type="ghost" size="small" inline onClick={this.getVerifyCode()}>获取验证码</Button>}
                                    >
                                       <div style={{position:"relative",height:"0.88rem",padding:"0.24rem 0"}}>
                                            <Icon type={MesgSvg} style={{width:"0.38rem",height:"0.38rem",color:"#4d4d4d"}}/>
                                        </div>
                                    </InputItem>
                                    <InputItem
                                        {...getFieldProps('password1')}
                                        placeholder="设置密码（8~16位）"
                                        type="password"
                                        error={this.state.passwordError}
                                    >
                                        <div style={{position:"relative",height:"0.88rem",padding:"0.24rem 0"}}>
                                            <Icon type={LockSvg} style={{width:"0.44rem",height:"0.44rem",color:"#4d4d4d"}}/>
                                        </div>
                                    </InputItem>
                                    <Picker extra="请选择(可选)"
                                            data={district}
                                            title="选择地区"
                                            {...getFieldProps('district', {
                                                initialValue: ['110000', '110100'],
                                            })}
                                            onOk={e => console.log('ok', e)}
                                            cols={2}
                                            onDismiss={e => console.log('dismiss', e)}
                                            >
                                            <List.Item arrow="horizontal">
                                                <Icon type={MapMarker} style={{width:"0.36rem",height:"0.36rem",color:"#4d4d4d",transform:"translate(0,0.1rem)"}}/>
                                                <span style={{paddingLeft:"0.36rem"}}>选择地区</span>
                                            </List.Item>
                                    </Picker>
                                    <Picker 
                                        data={[
                                            {
                                                value:"1",
                                                label:"教师"
                                            },
                                            {
                                                value:"2",
                                                label:"家长"
                                            },
                                            {
                                                value:"3",
                                                label:"其他"
                                            }
                                        ]} 
                                        cols={1}
                                        {...getFieldProps('Iden',{initialValue:["1"]})}
                                    >
                                        <List.Item arrow="horizontal">
                                            <Icon type={AddressCard} style={{width:"0.36rem",height:"0.36rem",color:"#4d4d4d",transform:"translate(0,0.1rem)"}}/>
                                            <span style={{paddingLeft:"0.36rem"}}>您的身份</span>
                                        </List.Item>
                                    </Picker>
                                    {false && 
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
                                    }
                                     <div style={{padding:"0.64rem 0.32rem"}}>
                                        <Button className="btn" type="primary" size="small" onClick={this.submitType()}>注  册</Button>
                                     </div>
                                </List>
                                <p style={{lineHeight:"0.88rem",fontSize:"0.24rem",textAlign:"center",color:"#4d4d4d"}}>如已有账户，<Link to="/login" style={{color:"#108ee9"}}>点击去登录。</Link></p>
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

const RegisterPage = createForm()(RegisterLayout);

export default RegisterPage;