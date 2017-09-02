import LessionUl from "../cards/lessionListUl.card";
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log('onChange', key);
}
function handleTabClick(key) {
  console.log('onTabClick', key);
}
const LessionForUser = () => (
  <div>
    <Tabs defaultActiveKey="1" onChange={callback} onTabClick={handleTabClick}>
      <TabPane tab={<Badge>全部课程</Badge>} key="1">
        <LessionUl />
      </TabPane>
      <TabPane tab={<Badge text={'3'}>未完成课程</Badge>} key="2">
          <LessionUl />
      </TabPane>
    </Tabs>
    <WhiteSpace />
  </div>
);

export default LessionForUser;