

import styles from './index.css';
import gkh from '@/assets/image/gkh.png';
import datas from '@/datas.js';

export default function LeftSidebar(props){
   return (<div className={`${styles.LeftSidebar}`}>
      <div className={`${styles.LeftSidebar_tips}`}>
        <img src={gkh} className={`${styles.LeftSidebar_tips_img}`}></img>
        <span className={`${styles.LeftSidebar_tips_text}`}>单击组件添加模块</span>
      </div>

      <div className={`${styles.LeftSidebar_subject}`}>
          { generateChildren(datas) }
      </div>
   </div>);
};


function generateChildren(datas){
    return datas.map((item, index)=>{
         return (<div className={`${styles.LeftSidebar_subject_item}`} key={index}>
            <img src={item.imgSrc} className={`${styles.LeftSidebar_subject_item_img}`}></img>
            <span className={`${styles.LeftSidebar_subject_item_text}`}>{ item.text }</span>
         </div>);
    });
};