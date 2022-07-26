
import styles from './index.css';


export default function ImgComp(props){
  return (<div className={styles.ImgComp}>
     <div className={styles.ImgComp_seizeASeat}>
      <img className={`${styles.ImgComp_seizeASeat_img}`} src='https://read.e.qq.com/assets/images/yuebao/icon_upload_back.png'></img>
     </div>
  </div>);
};