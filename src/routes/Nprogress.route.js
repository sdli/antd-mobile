import React from 'react';
import { connect } from 'dva';
import Nprogress from "nprogress";
import 'nprogress/nprogress.css';

console.log(Nprogress);
class ProgressPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {loading} = this.props;
        loading.global?Nprogress.start():Nprogress.done();
        return this.props.children;
    }
}

ProgressPage.propTypes = {

};

export default connect(({example,loading})=>{return {example,loading};})(ProgressPage);
