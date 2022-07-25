
import Subject from '@/components/subject/index.jsx';

import { useState, useEffect } from 'react';

import styles from './visualization.css';

export default function Visualization(props) {

  const [state, setState] = useState({
    dataStructure: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    domStructure: [],
    tranIdIfon: [],
    pressIfon: null,
    targetDomIfon: null,
    isItOnTheTarget: false,
    totalHeight: 0,
  });
  window.state = state
  return (<div className={`${styles.Visualization}`}>

    <Subject
      dataStructure={state.dataStructure}
      tranIdIfon={state.tranIdIfon}
      pressIfon={state.pressIfon}
      addDom={(dom) => { addDom(dom, state, setState) }}
      removeDom={() => { removeDom() }}
      handleDown={(obj) => { handleDown(obj, state, setState) }}
      handleMove={(ifon) => { handleMove(ifon, state, setState) }}
      handleUp={(ifon) => { handleUp(ifon, state, setState) }}
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


function handleClick() {

};

function handleDown(obj, state, setState) {
   let totalHeight = 0;
   for(let i = 0; i < state.domStructure.length; i++){
      const domIfon = state.domStructure[i].getBoundingClientRect();
      totalHeight += domIfon.height
   };

   setState({
    ...state,
    totalHeight
   });
  
};

function handleMove(ifon, state, setState) {

  const parentNodeIfon = state.domStructure[0].parentNode.getBoundingClientRect();
  const totalHeight = state.totalHeight > parentNodeIfon.height ? parentNodeIfon.height : state.totalHeight;
  const Boxbool = (ifon.clientX > parentNodeIfon.left) && (ifon.clientX < (parentNodeIfon.left + parentNodeIfon.width)) && (ifon.clientY > parentNodeIfon.top) && (ifon.clientY < (parentNodeIfon.top + totalHeight));
 

  // 获取目标dom
  let targetDom = state.domStructure.filter((dom) => {
    const domIfon = dom.getBoundingClientRect();
    const bool = (ifon.clientX > domIfon.left) && (ifon.clientX < (domIfon.left + domIfon.width)) && (ifon.clientY > domIfon.top) && (ifon.clientY < (domIfon.top + domIfon.height));
    return bool && (ifon.dom !== dom) && Boxbool; // 是否在目标dom上，并且不是按住的dom
  });
  targetDom = targetDom[0]; // 目标dom,如果没在目标上那么会 undefined
  

  if (!targetDom) {
    const tranIdIfon = [];
    
    for(let i = 0; i < state.domStructure.length; i++){
        tranIdIfon.push({
          id: state.domStructure[i].dataset.id,
          top: 0
        })
    };
   
    if(!Boxbool){
      const domStructure = [];
      
      for(let i = 0; i < state.dataStructure.length; i++){
           domStructure.push(state.domStructure.filter(dom => dom.dataset.id.toString() === state.dataStructure[i].id.toString())[0]);
      };
      
      setState({
        ...state,
        tranIdIfon,
        domStructure,
      });
    };
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
    tranIdIfon,
  });


};

function getItem(arr, id) {
  const s = arr.filter((item) => {
    return item.id.toString() === id.toString()
  });
  return s[0];
};



function handleUp(ifon, state, setState) {
    const pressDomIfon = ifon.dom.getBoundingClientRect();
    const parentNodeIfon = state.domStructure[0].parentNode.getBoundingClientRect();
    const totalHeight = state.totalHeight > parentNodeIfon.height ? parentNodeIfon.height : state.totalHeight;
    const Boxbool = (ifon.clientX > parentNodeIfon.left) && (ifon.clientX < (parentNodeIfon.left + parentNodeIfon.width)) && (ifon.clientY > parentNodeIfon.top) && (ifon.clientY < (parentNodeIfon.top + totalHeight));
    let myTop = 0;
    if(Boxbool){
      const index = state.domStructure.indexOf(ifon.dom);
      const index1 = index === 0 ? index : index - 1;
      const domIfon =  state.domStructure[index1].getBoundingClientRect();
      myTop = index ? domIfon.height + domIfon.top : domIfon.top
    };
    

    /* setState({
      ...state,
      pressIfon: {
        id: ifon.dom.dataset.id,
        top: Boxbool ? myTop : 0 
      }
    }); */
};

function handleTransitionEnd(state, setState, props) {

};