import React from "react";
import styles from "./card.style.less";

class Footer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const style = (typeof this.props.style !== "undefined")?this.props.style:{backgroundColor:"#ffffff"};
        return(
            <div className={styles.footerDiv} style={style}>
                <p>益爱科技（深圳）</p>
                <p>版权所有 2016-2017 备案号：[009-09823]</p>
            </div>
        );
    }
}

export default Footer;