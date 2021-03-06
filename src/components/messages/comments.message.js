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
    const {LessonMsg,LessonId,CourseId} = this.props;
    return (
        <div>
            <div className={styles.commentLink}>
              <p><Button size="small" type="ghost" inline onClick={()=>hashHistory.push("/commentDetails?LessonId="+LessonId+"&CourseId="+CourseId)}>点击评论</Button></p>
              <p>提交后，专家将看到您的留言</p>
            </div>
            <List style={{borderBottom:"1px solid #ddd"}}>
                {
                  LessonMsg.map(function(val,index){
                    var newDate = new Date();
                    newDate.setTime(parseInt(val.LeaveTime)*1000);
                    return (
                      <Item 
                      key={"comments"+CourseId+LessonId+index} 
                      multipleLine
                      wrap
                      extra={
                        <span>
                          <Icon type={CommentSvg} 
                                size="xxs" 
                          /> 
                                0
                        </span> 
                      }>
                        用户***<br/>
                        {val.Message}
                        <Brief>
                        <span className={styles.commentTime}>{newDate.toJSON().substr(0,10)}</span></Brief>
                      </Item>
                    );
                  })
                }
            </List>
    </div>);
  }
}

export default CommentList;