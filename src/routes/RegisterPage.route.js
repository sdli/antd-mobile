import React from 'react';
import { connect } from 'dva';
import RegisterComponent from "../components/layout/register.layout.web";

function RegisterPage({dispatch,user,loading}) {


  const Register = function(values){
      console.log(values);
      dispatch({type:"user/register",bodyObj: values});
  }

  const getVerifyCode = function(phone){
      dispatch({type:"user/getVerifyCode",bodyObj:{...phone}})
  }

  return (
    <div>
      <RegisterComponent 
        dispatch={dispatch} 
        registerMethod={{
          register: Register,
          getVerifyCode: getVerifyCode
        }}
      />
    </div>
  );
}

RegisterPage.propTypes = {
};

export default connect(({user})=>({user}))(RegisterPage);
