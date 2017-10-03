import React,{Component} from "react";
import styles from "./card.style.less";
import ShowImg from "../../assets/imgs/show.jpg";
import {setLocalStore,getLocalStore} from "../../utils/setLocalStore";

class Show extends Component{
    constructor(){
        super();
        this.state={
            show: true
        }
        this.closeShow = this.closeShow.bind(this);
    }

    closeShow(){
        this.setState({
            show: false
        });
        setLocalStore("show","ADSFJIEJLKSJIDJW",10);
    }

    render(){
        const ifShow = getLocalStore("show");
        if(!this.state.show || ifShow) return null;
        return (
            <div className={styles.showDiv}>
                <div className={styles.showMask}></div>
                <div className={styles.showContent}>
                    <img src={ShowImg} />
                    <div className={styles.showTitle}>
                        <p>专业打造家教品质</p>
                        <p>实力铸就益爱品牌</p>
                    </div>
                    <div className={styles.showSubtitle}>
                        <p>顶级专家、专业团队、系统课程、开启家庭教育</p>
                        <p>在线学习新篇章</p>
                    </div>
                    <div className={styles.showFunc}>
                        <p onClick={this.closeShow}>开始体验</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;