import React from "react";
import styles from "./message.css";

class Details extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>  
                <div className={styles.detailsBody}>
                    <div className={styles.detailsTitle}>
                        <p>留言 <span>想家的孩子</span></p>
                        <p>我曾经那么地快乐，为啥现在觉得不快乐，我是不是有心理疾病？</p>
                        <p>2016.08.09</p>
                    </div>
                    <p style={{textAlign:"center",fontSize:"0.24rem",lineHeight:"0.6rem"}}>共计 5 条回复</p>
                    <div className={styles.detailsCell}>
                        <div className={styles.detailsCellContent}>
                            <p>陆教授</p>
                            <div>
                                <p>
                                    您的问题很好。您的问题很好。您的问题很好。您的问题很好。您的问题很好。您的问题很好。您的问题很好。您的问题很好。
                                </p>
                            </div>
                        </div>
                        <div className={styles.detailsCellTag}>
                            <div>
                                <span>2017</span>
                                <br />
                                <span>06.09</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.detailsCell}>
                        <div className={styles.detailsCellContent}>
                            <p>陆教授</p>
                            <div>
                                <p>
                                    您的问题很好。
                                </p>
                            </div>
                        </div>
                        <div className={styles.detailsCellTag}>
                            <div>
                                <span>2017</span>
                                <br />
                                <span>06.09</span>
                            </div>
                        </div>
                    </div>
                    <div stlye={{clear:"both"}}></div>
                </div>
            </div>
        );
    }
}

export default Details;