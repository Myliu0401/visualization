
import styles from './index.css';


export default function ButtonComp(props){
      return (<div className={`${styles.ButtonComp}`}>
          <div className={`${styles.ButtonComp_box}`}>
            <button className={`${styles.ButtonComp_box_button}`}>继续阅读下一章</button>
          </div>
      </div>);
};