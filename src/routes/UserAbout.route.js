import React from 'react';
import { connect } from 'dva';
import Cards from "../components/cards/index.card";

function UserAboutPage({user}) {
  return (
    <div style={{padding:"0.32rem"}}>
      <p style={{padding:"0.32rem",textAlign:"center"}}><img src="http://image-edu.oss-cn-beijing.aliyuncs.com/system/logo.jpg" style={{width:"40%"}} /></p>
      <p style={{lineHeight:"0.36rem",fontSize:"0.28rem"}}>郑州益爱海蓓教育（简称益爱）成立于2011年，总部设在郑州，目前在北京、深圳、漯河、鹤壁、兰考等地都设有分支机构。公司以”解决孩子教育问题，培养幸福生活能力”为使命，秉承“打造高品质的家庭教育，为每个孩子一生的幸福奠基”的宗旨，通过线上线下的推广方式，一直致力于家庭教育公共服务体系建设。关注教师和家长家庭教育素质水平提升，以及青少年心理健康，特别是留守儿童、流动儿童心理关爱。</p>
      <p style={{lineHeight:"0.36rem",fontSize:"0.28rem",paddingTop:"0.4rem"}}>益爱着力于培养和造就更多智慧父母，组建幸福和谐的家庭；着力于关注青少年、儿童的心理成长，培养健康快乐的孩子；着力于普及适合于中国文化、教育环境及人文特点的中国式家庭教育科学理念；着力于深刻践行教育，志在点滴行动的倡导！</p>
    </div>
  );
}

UserAboutPage.propTypes = {
};

export default connect(({user})=>({user}))(UserAboutPage);
