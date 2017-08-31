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
                                        {...getFieldProps('tel')}
                                        placeholder="手机号码"
                                    >
                                        <div style={{position:"relative",height:"0.88rem",padding:"0.24rem 0.04rem"}}>
                                            <Icon type={UserSvg} style={{width:"0.38rem",height:"0.38rem",color:"#4d4d4d"}}/>
                                        </div>
                                    </InputItem>
                                    <InputItem
                                        {...getFieldProps('password')}
                                        placeholder="账号密码"
                                    >
                                        <div style={{position:"relative",height:"0.88rem",padding:"0.24rem 0"}}>
                                            <Icon type={LockSvg} style={{width:"0.44rem",height:"0.44rem",color:"#4d4d4d"}}/>
                                        </div>
                                    </InputItem>
                                    <InputItem
                                        {...getFieldProps('code')}
                                        placeholder="验证码"
                                        extra={<img src={CodeImg} style={{width:"2rem",height:"0.5rem"}} />}
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
                                        <Button className="btn" type="primary" size="small">登  录</Button>
                                     </div>
                                </List>
                                <p style={{lineHeight:"0.88rem",fontSize:"0.24rem",textAlign:"center",color:"#4d4d4d"}}>如忘记密码，可使用手机验证码登录。</p>
                            </div>
                        </TabPane>
                        <TabPane tab={<Badge>验证码登录</Badge>} key="2">
                            <div style={{padding:"0.5rem 0"}}>
                                <List>
                                    <InputItem
                                        {...getFieldProps('tel1')}
                                        placeholder="手机号码"
                                    >
                                        <div style={{position:"relative",height:"0.88rem",padding:"0.24rem 0.04rem"}}>
                                            <Icon type={UserSvg} style={{width:"0.38rem",height:"0.38rem",color:"#4d4d4d"}}/>
                                        </div>
                                    </InputItem>
                                    <InputItem
                                        {...getFieldProps('code1')}
                                        placeholder="验证码"
                                        extra={<Button type="ghost" size="small" inline>获取验证码</Button>}
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
                                        <Button className="btn" type="primary" size="small">登  录</Button>
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