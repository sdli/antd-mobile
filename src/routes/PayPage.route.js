import React from "react";
import { connect } from 'dva';

class PayPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <p>支付页面</p>
            </div>
        );
    }
}

export default connect()(PayPage);