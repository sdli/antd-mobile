import React from 'react';
import { connect } from 'dva';
import Nprogress from "nprogress";

console.log(Nprogress);
class ProgressPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {loading} = this.props;
        console.log(loading.global);
        setTimeout(function(){
            Nprogress.start();
            console.log("进度条完成");
            Nprogress.done();
        },1000);
        return this.props.children;
    }
}

ProgressPage.propTypes = {
};

export default connect(({loading})=>{return {loading};})(ProgressPage);
