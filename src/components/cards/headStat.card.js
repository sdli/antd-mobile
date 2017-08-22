import styles from "./card.style.less";

const headStat = function(lessons,timeLength){
    return (
        <div className={styles.headStat}>
            <div className={styles.headStatCell} style={{borderRight:"1px solid #f0f0f0"}}>
                <p>完成课程</p>
                <p><span>5</span>/36课时</p>
            </div>
            <div className={styles.headStatCell}>
                <p>平均得分</p>
                <p><span>87</span>分</p>
            </div>
        </div>
    );
};

export default headStat;