import React from "react";
import { Tabs, WhiteSpace, Badge,List,Icon } from 'antd-mobile';
import CommentList from "../messages/comments.message";
import styles from "./message.css";

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;

function callback(key) {
    console.log('onChange', key);
}
function handleTabClick(key) {
    console.log('onTabClick', key);
}

class MessageList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Tabs defaultActiveKey="1" onChange={callback} onTabClick={handleTabClick} animated={false} swipeable={false}>
                    <TabPane tab={<Badge text={'3'}>留言回复</Badge>} key="1">
                        <List style={{borderBottom:"1px solid #ddd"}}>
                            <Item multipleLine extra={<span>点击回复</span> }>
                                李教授 给您回复<Brief>家庭教育的核心是什么？</Brief><Brief><span className={styles.commentTime}>2017.09.01</span></Brief>
                            </Item>
                            <Item multipleLine extra={<span>点击回复</span> }>
                                李教授 给您回复<Brief>家庭教育的核心是什么？</Brief><Brief><span className={styles.commentTime}>2017.09.01</span></Brief>
                            </Item>
                            <Item multipleLine extra={<span>点击回复</span> }>
                                李教授 给您回复<Brief>家庭教育的核心是什么？</Brief><Brief><span className={styles.commentTime}>2017.09.01</span></Brief>
                            </Item>
                        </List>
                    </TabPane>
                    <TabPane tab={<Badge>系统通知</Badge>} key="2">
                        <List style={{borderBottom:"1px solid #ddd"}}>
                            <Item multipleLine>
                                市教育局 发布<p style={{whiteSpace: "normal"}}>请各位老师，在9月30日前，完成课程后填写心得，每人心得在100~300字，自由发挥。我们将会选出10名心得作为优质学员。</p><Brief><span className={styles.commentTime}>2017.09.01</span></Brief>
                            </Item>
                        </List>
                    </TabPane>
                </Tabs>
                <WhiteSpace />
            </div>
        );
    }
}

export default MessageList;
