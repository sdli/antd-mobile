import React from 'react';
import { connect } from 'dva';
import DistributionCard from "../components/cards/loginSelect.card";

function LoginSelectPage() {
  return (
    <div>
      <DistributionCard />
    </div>
  );
}

LoginSelectPage.propTypes = {
};

export default connect()(LoginSelectPage);
