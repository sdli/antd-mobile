import React from "react";
import styles from "./message.css";

class Details extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {LessonDetails} = this.props;
        return(
            <div>  
                <div className={styles.detailsBody}>
                    <div className={styles.detailsTitle}>
                        <p>留言给： <span>{LessonDetails.Professor}(教授)</span></p>
                        <p><span style={{fontSize:"0.28rem",color:"#4d4d4d"}}>留言课程：</span>{LessonDetails.LessonName}</p>
                    </div>
                    {/* <p style={{textAlign:"center",fontSize:"0.24rem",lineHeight:"0.6rem"}}>共计 5 条回复</p> */}
                    {/* <div className={styles.detailsCell}>
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
                    </div> */}
                    <div style={{clear:"both"}}></div>
                </div>
            </div>
        );
    }
}

export default Details;