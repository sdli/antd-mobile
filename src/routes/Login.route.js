import React from 'react';
import { connect } from 'dva';
import LoginComponent from "../components/layout/login.layout.web";

function LoginPage() {
  return (
    <div>
      <LoginComponent />
    </div>
  );
}

LoginPage.propTypes = {
};

export default connect()(LoginPage);
