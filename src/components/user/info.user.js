import React from "react";
import { List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

const Item = List.Item;

class UserInfo extends React.Component {
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>          
            <List renderHeader={() => '个人信息'}>
                <Item extra={'李大牛'} onLongPress={this.handleLongPress}>姓名</Item>
                <Item extra={'信阳一中'} onLongPress={this.handleLongPress}>电话</Item>
                <Item extra={'3787187****123'} onLongPress={this.handleLongPress}>身份证号</Item>
                <Item extra={'信阳一中'} onLongPress={this.handleLongPress}>学校</Item>
          </List>
          <div className="divider" />
      </div>
    );
  }
}

const UserInfoPage = createForm()(UserInfo);
export default UserInfoPage;