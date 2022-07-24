
import Subject from '@/components/subject/index.jsx';

import { useState, useEffect } from 'react';

import styles from './visualization.css';

export default function Visualization(props) {

  const [state, setState] = useState({
    dataStructure: [{ id: 1 }, { id: 2 }, { id: 3 }],
    domStructure: [],
    tranIdIfon: [],
    pressIfon: null,
    targetDomIfon: null,
    isItOnTheTarget: false
  });
  window.state = state
  return (<div className={`${styles.Visualization}`}>

    <Subject
      dataStructure={state.dataStructure}
      tranIdIfon={state.tranIdIfon}
      addDom={(dom) => { addDom(dom, state, setState) }}
      removeDom={() => { removeDom() }}
      handleDown={(obj) => { handleDown(obj, state, setState) }}
      handleMove={(ifon) => { handleMove(ifon, state, setState) }}
      handleUp={() => { handleUp() }}
      handleClick={() => { handleClick() }}
      handleTransitionEnd={() => { handleTransitionEnd(state, setState, props) }}
    ></Subject>

  </div>);
};



function addDom(dom, state, setState) {
  state.domStructure.push(dom);
  setState({
    ...state
  });
};


function removeDom() {

};

function handleMouseDown() {

};

function handleClick() {

};

function handleDown(obj, state, setState) {

  /*  setState({
     ...state,
     pressIfon: {
       width: obj.domIfon.width,
       height: obj.domIfon.height,
       top: obj.domIfon.top,
       left: obj.domIfon.left,
       id: obj.id
     }
   }); */
};

function handleMove(ifon, state, setState) {

  // 获取目标dom
  let targetDom = state.domStructure.filter((dom) => {
    const domIfon = dom.getBoundingClientRect();
    const bool = (ifon.clientX > domIfon.left) && (ifon.clientX < (domIfon.left + domIfon.width)) && (ifon.clientY > domIfon.top) && (ifon.clientY < (domIfon.top + domIfon.height));
    return bool && (ifon.dom !== dom); // 是否在目标dom上，并且不是按住的dom
  });
  targetDom = targetDom[0]; // 目标dom,如果没在目标上那么会 undefined


  if (!targetDom) {
    
    return;
  };
  const targetDomIfon = targetDom.getBoundingClientRect(); // 目标dom的信息
  const pressDomIfon = ifon.dom.getBoundingClientRect(); // 按住dom的信息

  // 获取按住的索引和目标的索引
  const pressDomIndex = state.domStructure.indexOf(ifon.dom); // 按住索引
  const targetDomIndex = state.domStructure.indexOf(targetDom); // 目标索引


  // 判断是否临近的dom
  const isItClose = (pressDomIndex + 1 === targetDomIndex) || (pressDomIndex - 1 === targetDomIndex);
  let itCloseBool = null; // 如果目标是临近dom那么，坐标位置是否满足

  // 获取坐标的目标dom中间线的上方还是下方
  const upAndDown = (ifon.clientY > (targetDomIfon.top + targetDomIfon.height / 2)) ? 'bottom' : 'top';

  if (isItClose) {
    itCloseBool = ((pressDomIndex < targetDomIndex) && (upAndDown === 'bottom'));
    itCloseBool || (itCloseBool = ((pressDomIndex > targetDomIndex) && (upAndDown === 'top')));
  };

  let targetIndex = null;
  let pressIndex = null;
  let targetIndex1 = null;

  if ((isItClose && itCloseBool) || !isItClose) {

    if (upAndDown === 'top') {
      targetIndex = pressDomIndex < targetDomIndex ? targetDomIndex - 1 : targetDomIndex;
      targetIndex1 = targetDomIndex;
    } else if (upAndDown === 'bottom') {
      targetIndex = pressDomIndex < targetDomIndex ? targetDomIndex : targetDomIndex + 1;
      targetIndex1 = targetDomIndex + 1;
    };

  } else {
    return;
  }

  pressIndex = pressDomIndex < targetDomIndex ? pressDomIndex + 1 : pressDomIndex - 1;

  if (pressIndex > targetIndex) {
    targetIndex += pressIndex
    pressIndex = targetIndex - pressIndex
    targetIndex = targetIndex - pressIndex
  };

  const tranIdIfon = [];
  for (let i = 0; i < state.domStructure.length; i++) {
    const dom = state.domStructure[i];
    const bool = getItem(state.tranIdIfon, dom.dataset.id);
    let myTop = null
    if ((i >= pressIndex) && (i <= targetIndex)) {

      if (pressDomIndex < targetDomIndex) {
        myTop = +dom.dataset.top !== 0 ? 0 : -pressDomIfon.height
      } else {

        myTop = +dom.dataset.top !== 0 ? 0 : pressDomIfon.height

      }

    }

    if (bool) {
      tranIdIfon.push({
        id: dom.dataset.id,
        top: myTop !== null ? myTop : bool.top
      })
    } else {
      tranIdIfon.push({
        id: dom.dataset.id,
        top: myTop !== null ? myTop : 0
      })
    }

  };



  const pressDom = state.domStructure[pressDomIndex];
  state.domStructure.splice(pressDomIndex, 1, null);
  state.domStructure.splice(targetIndex1, 0, pressDom);
  state.domStructure.splice(state.domStructure.indexOf(null), 1);

  setState({
    ...state,
    tranIdIfon
  })


};

function getItem(arr, id) {
  const s = arr.filter((item) => {
    return item.id.toString() === id.toString()
  });
  return s[0];
};





function handleUp() {

};

function handleTransitionEnd(state, setState, props) {

};