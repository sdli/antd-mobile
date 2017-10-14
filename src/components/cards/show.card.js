import React,{Component} from "react";
import {Icon} from "antd-mobile";
import styles from "./card.style.less";
import ShowImg from "../../assets/imgs/show.jpg";
import {setLocalStore,getLocalStore} from "../../utils/setLocalStore";
import CloseSvg from "../../assets/svgs/window-close.svg";

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
        setLocalStore("show_v1","ADSFJIEJLKSJIDJW",30);
    }

    render(){
        const ifShow = getLocalStore("show_v1");
        if(!this.state.show || ifShow) return null;
        const showList={
            header: "http://image-edu.oss-cn-beijing.aliyuncs.com/show/20171014.png",
            content: [
                {title:"资深专家",url:"http://image-edu.oss-cn-beijing.aliyuncs.com/show/icon1.png"},
                {title:"专业团队",url:"http://image-edu.oss-cn-beijing.aliyuncs.com/show/icon2.png"},
                {title:"系统课程",url:"http://image-edu.oss-cn-beijing.aliyuncs.com/show/icon3.png"}
            ],
            subHeader: "http://image-edu.oss-cn-beijing.aliyuncs.com/show/2.jpg"
        };
        return (
            <div className={styles.showDiv}>
                <div className={styles.showMask}></div>
                <div className={styles.showContent}>
                    <p onClick={this.closeShow} className={styles.closeTag}><Icon type={CloseSvg} style={{transform:"translateY(25%)",width:"0.36rem"}}/>  关闭窗口</p>
                    <img src={showList.header}/>
                    <div className={styles.showBody} >
                        <div className={styles.showTitle}>
                            {
                                showList.content.map((val,index) => {
                                    return (
                                        <div key={"show"+index} >
                                            <img src={val.url} />
                                            <p>{val.title}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className={styles.showSubtitle}>
                            <img src={showList.subHeader} />
                        </div>
                        <div className={styles.showFunc}>
                            <p onClick={this.closeShow}>开始体验</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;