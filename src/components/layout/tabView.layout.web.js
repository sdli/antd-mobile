import {TabBar,Icon} from 'antd-mobile';
import MainPageSVG from "../../assets/svgs/university.svg";
import MsgSVG from "../../assets/svgs/commenting-o.svg";
import ReadingSVG from "../../assets/svgs/book.svg";
import UserCenterSVG from "../../assets/svgs/user-circle-o.svg";
import Carou from "../cards/carousel.card.js";
import HeadStat from "../cards/headStat.card.js";
import LessionList from "../cards/headLesson.card.js";

/* eslint global-require: 0 */

class TabBarExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
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
          selected={this.state.selectedTab === 'blueTab'}
          badge={1}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}
          data-seed="logId"
        >
          { <div>
              <Carou />
              <HeadStat />
              <div style={{height:"32px"}}></div>
              <LessionList />
            </div>
          }
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon type={ReadingSVG} />}
          selectedIcon={<Icon type={ReadingSVG} />}
          title="阅读"
          key="reading"
          badge={'new'}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}
          data-seed="logId1"
        >
          {this.renderContent('阅读')}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <Icon type={MsgSVG} />
          }
          selectedIcon={
            <Icon type={MsgSVG} />
          }
          title="消息"
          key="message"
          dot
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
            });
          }}
        >
          {this.renderContent('消息')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon type={UserCenterSVG} />}
          selectedIcon={<Icon type={UserCenterSVG} />}
          title="我的"
          key="user"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            });
          }}
        >
          {this.renderContent('我的')}
        </TabBar.Item>
      </TabBar>
    );
  }
}

export default TabBarExample;