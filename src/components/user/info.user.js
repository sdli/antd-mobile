import React from "react";
import { List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import CityCode from "../layout/lib/codeList";

const Item = List.Item;

function getCityName(code){
  for(var i=0;i<CityCode.length;i++){
    for(var j =0;j<CityCode[i].children.length;j++){
      if(CityCode[i].children[j].value == code){
        return CityCode[i].label+"-"+CityCode[i].children[j].label;
      }
    }
  }
}

class UserInfo extends React.Component {

  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(){
    if(confirm("确认退出登录？")){
      const {dispatch} = this.props;
      dispatch({type:"user/logout"});
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { userInfo } = this.props;
    return (
      <div>  
          {
            (typeof userInfo !== "undefined") &&
              <List renderHeader={() => '个人信息'}>
                  <Item extra={userInfo.name} onLongPress={this.handleLongPress}>姓名</Item>
                  <Item extra={userInfo.Phone} onLongPress={this.handleLongPress}>电话</Item>
                  <Item extra={getCityName("110100")} onLongPress={this.handleLongPress}>地区</Item>
            </List>
          }        
          <div className="divider" />
          <p style={{lineHeight:"1rem",fontSize:"0.28rem",color:"red",textAlign:"center"}} onClick={this.logout}>退出登录</p>
      </div>
    );
  }
}

const UserInfoPage = createForm()(UserInfo);
export default UserInfoPage;