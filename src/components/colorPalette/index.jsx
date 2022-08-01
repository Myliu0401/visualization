

import { useEffect, useState } from 'react';
import styles from './index.css';

export default function ColorPalette(props){
     return (<div className={`${styles.styles}`}>
        <div className={`${styles.promptArea}`}>
          <span className={`${styles.promptArea_color}`}></span>
          <div className={`${styles.promptArea_inputArea}`}>
            <span className={`${styles.promptArea_inputArea_text}`}></span>
            <input className={`${styles.promptArea_inputArea_input}`}></input>
          </div>
        </div>
        <div className=''></div>
        <div className=''></div>
     </div>);
};