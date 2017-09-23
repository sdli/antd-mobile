import React from "react";
import styles from "./user.css";
import UserImg from "../../assets/imgs/logo.png";
import { List,Icon } from 'antd-mobile';
import ListAltSVG from "../../assets/svgs/list-alt.svg";
import StarHalfSVG from "../../assets/svgs/star-half-o.svg";
import EditSVG from "../../assets/svgs/pencil-square-o.svg";
import HeadPhoneSVG from "../../assets/svgs/headphones.svg";
import {hashHistory} from "react-router";

const Item = List.Item;

class UserCenter extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {userInfo} = this.props;
        return(
            
            <div>
                { 
                    (typeof userInfo !== "undefined") &&
                    <div className={styles.userTitle}>
                        <img src={UserImg} />
                        <div className={styles.userInfoHead}>
                            <p>{userInfo.name?userInfo.name:"益爱用户"} <span>{(userInfo.IdNo==1)?"教师":"普通用户"}</span></p>
                            <p>{userInfo.Phone}</p>
                        </div>
                        <div className={styles.userInfoTag} onClick={()=>hashHistory.push("/user/info")}>
                            <Icon type={EditSVG} style={{with:"0.36rem",height:"0.36rem",color:"#ffffff"}} />
                        </div>
                    </div>
                }
                
                <div className="divider" />
                <div>
                    <List renderHeader={() => '个人功能'}>
                        <Item
                        thumb={<Icon type={ListAltSVG} 
                        size="sm" 
                        style={{color: "#EC670D"}}/>}
                        arrow="horizontal"
                        onClick={() => {hashHistory.push("/user/statics")}}
                        ><span style={{paddingLeft:"0.2rem"}}>学习进度</span></Item>
                        {/* <Item 
                        thumb={<Icon type={StarHalfSVG}
                        size="sm"
                        onClick={() => {hashHistory.push("/user/stars")}}
                        style={{color: "#00D040"}} 
                        />}
                        arrow="horizontal">
                         <span style={{paddingLeft:"0.2rem"}}>课程评分</span>
                        </Item> */}
                    </List>
                </div>
                <div className="divider" />
                <div>
                    <List renderHeader={() =>'意见反馈'}>
                        <Item
                        thumb={<Icon type={HeadPhoneSVG} size="sm" style={{color: "#999999"}} />}
                        arrow="horizontal"
                        onClick={() => {alert("尊敬的用户，请在微信公众号直接留言提交！");}}
                        >
                        <span style={{paddingLeft:"0.2rem"}}>提交反馈</span>
                        </Item>
                    </List>
                </div>
                <div className="divider" />
            </div>
        );
    }
}

export default UserCenter;