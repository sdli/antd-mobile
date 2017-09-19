import {TabBar,Icon} from 'antd-mobile';
import MainPageSVG from "../../assets/svgs/university.svg";
import MsgSVG from "../../assets/svgs/commenting-o.svg";
import ReadingSVG from "../../assets/svgs/book.svg";
import UserCenterSVG from "../../assets/svgs/user-circle-o.svg";
import Carou from "../cards/carousel.card.js";
import HeadStat from "../cards/headStat.card.js";
import LessionList from "../cards/headLesson.card.js";
import MessageList from "../messages/messageList.message";
import Footer from "../cards/footer.card";
import UserCenter from "../user/tabview.user";
import { hashHistory } from 'react-router';

/* eslint global-require: 0 */

class TabBarExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.index,
      hidden: false
    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center'}}>
        <div style={{ paddingTop: 60 ,}}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9'  }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          点击切换 tab-bar 显示/隐藏
        </a>
      </div>
    );
  }

  render() {
    const {courses} = this.props;
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="课程"
          key="lessons"
          icon={<Icon type={MainPageSVG} />}
          selectedIcon={<Icon type={MainPageSVG} />}
          selected={this.state.selectedTab == 1 }
          onPress={() => {
            hashHistory.push("/");
          }}
          data-seed="logId"
        >
          { <div>
              <Carou />
              <HeadStat />
              <div className="divider"></div>
              <LessionList courses={courses} />
              <Footer style={{backgroundColor:"#f6f6f6",marginBottom:"2rem"}} />
            </div>
          }
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon type={ReadingSVG} />}
          selectedIcon={<Icon type={ReadingSVG} />}
          title="消息"
          key="reading"
          selected={this.state.selectedTab == 2}
          onPress={() => {
            hashHistory.push("/message");
          }}
          data-seed="logId1"
        >
          {<MessageList />}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon type={UserCenterSVG} />}
          selectedIcon={<Icon type={UserCenterSVG} />}
          title="个人"
          key="user"
          selected={this.state.selectedTab == 3}
          onPress={() => {
            hashHistory.push("/user");
          }}
        >
          {<UserCenter />}
        </TabBar.Item>
      </TabBar>
    );
  }
}

export default TabBarExample;