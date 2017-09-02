import { List,Icon,Button } from 'antd-mobile';
import CommentSvg from "../../assets/svgs/commenting-o.svg";
import styles from "./message.css";
import {hashHistory} from "react-router";
import PencialSvg from "../../assets/svgs/pencil-square-o.svg";

const Item = List.Item;
const Brief = Item.Brief;

class CommentList extends React.Component {
  state = {
    disabled: false,
  }

  render() {
    return (
        <div>
            <div className={styles.commentLink}>
              <p><Button size="small" type="ghost" inline onClick={()=>hashHistory.push("/commentDetails")}>点击评论</Button></p>
              <p>提交后，专家将看到您的留言</p>
            </div>
            <List style={{borderBottom:"1px solid #ddd"}}>
                <Item multipleLine extra={<span><Icon type={CommentSvg} size="xxs" onClick={()=>hashHistory.push("/commentDetails")} /> 1</span> }>
                  李道然<Brief>家庭教育的核心是什么？</Brief><Brief><span className={styles.commentTime}>2017.09.01</span></Brief>
                </Item>
                <Item multipleLine extra={<span><Icon type={CommentSvg} size="xxs" onClick={()=>hashHistory.push("/commentDetails")} /> 1</span> }>
                  李道然<Brief>家庭教育的核心是什么？</Brief><Brief><span className={styles.commentTime}>2017.09.01</span></Brief>
                </Item>
                <Item multipleLine extra={<span><Icon type={CommentSvg} size="xxs" onClick={()=>hashHistory.push("/commentDetails")} /> 1</span> }>
                  李道然<Brief>家庭教育的核心是什么？</Brief><Brief><span className={styles.commentTime}>2017.09.01</span></Brief>
                </Item>
                <Item multipleLine extra={<span><Icon type={CommentSvg} size="xxs" onClick={()=>hashHistory.push("/commentDetails")} /> 1</span> }>
                  李道然<Brief>家庭教育的核心是什么？</Brief><Brief><span className={styles.commentTime}>2017.09.01</span></Brief>
                </Item>
            </List>
    </div>);
  }
}

export default CommentList;