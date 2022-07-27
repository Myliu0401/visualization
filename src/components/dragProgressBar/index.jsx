
import styles from './index.css';

export default function DragProgressBar(props){
    return (<div className={`${styles.DragProgressBar}`}>
      <span className={`${styles.DragProgressBar_title}`}>test</span>
      <div className={`${styles.DragProgressBar_subject}`}>
        <p className={`${styles.DragProgressBar_subject_p}`}>
          <span className={`${styles.DragProgressBar_subject_p_span}`}></span>
        </p>
      </div>
      <input className={`${styles.DragProgressBar_input}`}/>
    </div>);
};