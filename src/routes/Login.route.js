import React from 'react';
import { connect } from 'dva';
import LoginComponent from "../components/layout/login.layout.web";

function LoginPage({dispatch,user,loading}) {

  const DispatchLoginByPassword = function(values){
      console.log(values);
      dispatch({type:"user/login",bodyObj:values});
  }

  const DispatchLoginByCode = function(values){
      console.log(values);
      dispatch({type:"user/login",bodyObj: values});
  }

  const getVerifyCode = function(phone){
      dispatch({type:"user/getVerifyCode",bodyObj:{...phone}})
  }

  return (
    <div>
      <LoginComponent 
        dispatch={dispatch} 
        loginMethod={{
          password: DispatchLoginByPassword,
          code : DispatchLoginByCode,
          getVerifyCode: getVerifyCode
        }}
      />
    </div>
  );
}

LoginPage.propTypes = {
};

export default connect(({user})=>({user}))(LoginPage);
