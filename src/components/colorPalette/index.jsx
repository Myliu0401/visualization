

import { useEffect, useState } from 'react';
import styles from './index.css';

export default function ColorPalette(props) {
  return (<div className={`${styles.ColorPalette}`}>
    <div className={`${styles.promptArea}`}>
      <span className={`${styles.promptArea_color}`}></span>
      <div className={`${styles.promptArea_inputArea}`}>
        <span className={`${styles.promptArea_inputArea_text}`}>#</span>
        <input className={`${styles.promptArea_inputArea_input}`}></input>
      </div>
    </div>
    <div className={`${styles.paletteArea}`}>
      <div className={`${styles.paletteArea_titleArea}`}>
        <span className={`${styles.paletteArea_titleArea_title}`}>标准色板</span>
        <svg className={`${styles.paletteArea_titleArea_icon}`} width="18" height="18" viewBox="0 0 18 18" fill="#a3a3a3" data-interactive="false" data-icon="arrow-down"><path d="M14.303 6.69995L13.9495 6.3464C13.7542 6.15114 13.4376 6.15114 13.2424 6.3464L9.00048 10.5893L4.75709 6.3464C4.56183 6.15114 4.24525 6.15114 4.04999 6.3464L3.69643 6.69995C3.50117 6.89521 3.50117 7.2118 3.69643 7.40706L8.64618 12.3568C8.84144 12.5521 9.15803 12.5521 9.35329 12.3568L14.303 7.40706C14.4983 7.2118 14.4983 6.89521 14.303 6.69995Z" fillRule="evenodd"></path></svg>
      </div>
      <div className={`${styles.paletteArea_content}`}>
        {generateColorBlock(props)}
      </div>
    </div>
    <div className={`${styles.customArea}`}>
      <div className={`${styles.paletteArea_titleArea}`}>
        <span className={`${styles.paletteArea_titleArea_title}`}>自定义</span>
        <svg className={`${styles.paletteArea_titleArea_icon}`} width="18" height="18" viewBox="0 0 18 18" fill="#a3a3a3" data-interactive="false" data-icon="arrow-down"><path d="M14.303 6.69995L13.9495 6.3464C13.7542 6.15114 13.4376 6.15114 13.2424 6.3464L9.00048 10.5893L4.75709 6.3464C4.56183 6.15114 4.24525 6.15114 4.04999 6.3464L3.69643 6.69995C3.50117 6.89521 3.50117 7.2118 3.69643 7.40706L8.64618 12.3568C8.84144 12.5521 9.15803 12.5521 9.35329 12.3568L14.303 7.40706C14.4983 7.2118 14.4983 6.89521 14.303 6.69995Z" fillRule="evenodd"></path></svg>
      </div>
      <div className={`${styles.customArea_content}`}>
        <div className={`${styles.customArea_content_paletteArea}`}>
          <span className={`${styles.customArea_content_paletteArea_span}`}></span>
        </div>
        <div className={`${styles.customArea_content_progressArea}`}>
          <div className={`${styles.customArea_content_progressArea_item}`}>
            <span className={`${styles.customArea_content_progressArea_item_title}`}></span>
            <p className={`${styles.customArea_content_progressArea_item_progress}`}>
              <span className={`${styles.customArea_content_progressArea_item_progress_span}`}></span>
            </p>
          </div>
          <div className={`${styles.customArea_content_progressArea_item}`}>
            <span className={`${styles.customArea_content_progressArea_item_title}`}></span>
            <p className={`${styles.customArea_content_progressArea_item_progress}`}>
              <span className={`${styles.customArea_content_progressArea_item_progress_span}`}></span>
            </p>
          </div>
          <div className={`${styles.customArea_content_progressArea_item}`}>
            <span className={`${styles.customArea_content_progressArea_item_title}`}></span>
            <p className={`${styles.customArea_content_progressArea_item_progress}`}>
              <span className={`${styles.customArea_content_progressArea_item_progress_span}`}></span>
            </p>
          </div>
          <div className={`${styles.customArea_content_progressArea_item}`}>
            <span className={`${styles.customArea_content_progressArea_item_title}`}></span>
            <p className={`${styles.customArea_content_progressArea_item_progress}`}>
              <span className={`${styles.customArea_content_progressArea_item_progress_span}`}></span>
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>);
};

ColorPalette.defaultProps = {
  colorBlocks: [
    { color: 'rgb(255, 255, 255)', id: 1 },
    { color: 'rgb(235, 235, 235)', id: 2 },
    { color: 'rgb(184, 184, 184)', id: 3 },
    { color: 'rgb(133, 133, 133)', id: 4 },
    { color: 'rgb(82, 82, 82)', id: 5 },
    { color: 'rgb(31, 31, 31)', id: 6 },
    { color: 'rgb(0, 0, 0)', id: 7 },
    { color: 'rgb(247, 97, 92)', id: 8 },
    { color: 'rgb(255, 177, 61)', id: 9 },
    { color: 'rgb(255, 234, 77)', id: 10 },
    { color: 'rgb(141, 224, 128)', id: 11 },
    { color: 'rgb(91, 222, 200)', id: 12 },
    { color: 'rgb(99, 188, 255)', id: 13 },
    { color: 'rgb(250, 140, 244)', id: 14 },
    { color: 'rgb(222, 40, 33)', id: 15 },
    { color: 'rgb(237, 141, 24)', id: 16 },
    { color: 'rgb(250, 217, 2)', id: 17 },
    { color: 'rgb(69, 186, 79)', id: 18 },
    { color: 'rgb(10, 194, 169)', id: 19 },
    { color: 'rgb(47, 142, 237)', id: 20 },
    { color: 'rgb(210, 89, 212)', id: 21 },
    { color: 'rgb(153, 37, 31)', id: 22 },
    { color: 'rgb(184, 87, 28)', id: 23 },
    { color: 'rgb(217, 166, 26)', id: 24 },
    { color: 'rgb(52, 140, 70)', id: 25 },
    { color: 'rgb(29, 138, 127)', id: 26 },
    { color: 'rgb(30, 100, 166)', id: 27 },
    { color: 'rgb(140, 66, 143)', id: 28 },]
}

function generateColorBlock(props) {
  return (<ul className={`${styles.paletteArea_content_box}`}>
    {props.colorBlocks.map((item) => {
      return (<li className={`${styles.paletteArea_content_box_item}`} key={item.id} style={{ backgroundColor: item.color }}></li>)
    })}
  </ul>)
};