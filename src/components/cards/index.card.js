import { Tabs, WhiteSpace } from 'antd-mobile';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log('onChange', key);
}
function handleTabClick(key) {
  console.log('onTabClick', key);
}
const TabExample = () => (
  <div>
    <Tabs defaultActiveKey="2" onChange={callback} onTabClick={handleTabClick}>
      <TabPane tab="选项卡一" key="1">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
          选项卡一内容
        </div>
      </TabPane>
      <TabPane tab="选项卡二" key="2">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
          选项卡二内容
        </div>
      </TabPane>
      <TabPane tab="选项卡三" key="3">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
          选项卡三内容
        </div>
      </TabPane>
    </Tabs>
    <WhiteSpace />
  </div>
);

export default TabExample;