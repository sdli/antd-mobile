import React from "react";

class PayCard extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch({type:"user/checkOpenid",url:"/#/pay"});
    }

    render(){
        return (
            <div>
                <p>正在加载微信支付...</p>
            </div>
        );
    }
}

export default PayCard;