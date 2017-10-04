import React from 'react';
import { connect } from 'dva';
import Nprogress from "nprogress";
import 'nprogress/nprogress.css';
import { Toast } from 'antd-mobile';

console.log(Nprogress);

class ProgressPage extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.toast.msg != "" && nextProps.toast.type != "" && !nextProps.loading.global){
            console.log(nextProps.toast.type,nextProps.toast.msg)
            Toast[nextProps.toast.type](nextProps.toast.msg,1);
            setTimeout(()=>Toast.hide(),1000);
            this.props.dispatch({type:"toast/clearToast"});
        }
        nextProps.loading.global?Nprogress.start():Nprogress.done();
    }

    render(){
        const {loading,toast} = this.props;
        console.log(loading);
        return (
            <div>
                {   
                    this.props.children
                }
            </div>
        );
    }
}

ProgressPage.propTypes = {};

export default connect(({user,loading,toast})=>{return {user,loading,toast};})(ProgressPage);