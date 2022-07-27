
import styles from './index.css';

export default function NovelComp(props){
  return (<div className={`${styles.NovelComp}`}>
     <div className={`${styles.NovelComp_box}`}>
        <div className={`${styles.NovelComp_box_content}`}>
          <div className={`${styles.NovelComp_box_content_box}`}>
            <div className={`${styles.NovelComp_box_content_box_left}`}>
              <img className={`${styles.NovelComp_box_content_box_left_img}`} src="https://i.gtimg.cn/qzone/biz/gdt/promotion/pages/landingpage/pagemaker/images/tencent_logo.png"></img>
              <div className={`${styles.NovelComp_box_content_box_left_textBox}`}>
                <span className={`${styles.NovelComp_box_content_box_left_textBox_title}`}>腾讯</span>
                <span className={`${styles.NovelComp_box_content_box_left_textBox_text}`}>腾讯公司官方唯一账号</span>
              </div>
            </div>
            <button className={`${styles.NovelComp_box_content_box_right}`}>关注</button>
          </div>
        </div>
        <div className={`${styles.NovelComp_box_seizeASeat}`}>
          <img className={`${styles.NovelComp_box_seizeASeat_img}`} src="https://read.e.qq.com/assets/images/yuebao/guide-1.png"></img>
        </div>
     </div>
  </div>);
};