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
                <p>检测openid...</p>
            </div>
        );
    }
}

export default PayCard;