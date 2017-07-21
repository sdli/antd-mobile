import Flex from 'antd-mobile/lib/flex';
import WhiteSpace from 'antd-mobile/lib/white-space';
import styles from "./index.less";

const PlaceHolder = props => (
  <div
  >Item</div>
);

const FlexExample = () => (
  <div className={styles.flexContainer}>
    <div className={styles.subTitle}>基本</div>
    <WhiteSpace size="lg" />
    <Flex>
      <Flex.Item><PlaceHolder /></Flex.Item>
      <Flex.Item><PlaceHolder /></Flex.Item>
      <Flex.Item><PlaceHolder /></Flex.Item>
      <Flex.Item><PlaceHolder /></Flex.Item>
    </Flex>
    <WhiteSpace size="lg" />
  </div>
);

export default FlexExample;