
import Subject from '@/components/subject/index.jsx';

import { useState, useEffect } from 'react';

import styles from './visualization.css';

export default function Visualization(props) {

  const [state, setState] = useState({
    dataStructure: [{ id: 1 }, { id: 2 }, { id: 3 }],
    domStructure: [],
    tranIdIfon: null,
    pressIfon: null,
    isTranEnd: true,

  });
  window.state = state
  return (<div className={`${styles.Visualization}`}>

    <Subject
      dataStructure={state.dataStructure}
      tranIdIfon={state.tranIdIfon}
      pressIfon={state.pressIfon}
      addDom={(dom) => { addDom(dom, state, setState) }}
      removeDom={() => { removeDom() }}
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
  })
};


function removeDom() {

};

function handleClick() {

};

function handleMove(ifon, state, setState) {
  const newDoms = state.domStructure.filter(dom => ifon.dom !== dom);
  const newDoms1 = newDoms.filter((dom) => {
    const domIfon = dom.getBoundingClientRect();
    const height = domIfon.height;
    const width = domIfon.width;
    const top = domIfon.top;
    const left = domIfon.left;
    const bool1 = ifon.clientX > left;
    const bool2 = ifon.clientY > top;
    const bool3 = ifon.clientX < left + width;
    const bool4 = ifon.clientY < top + height;
    return bool1 && bool2 && bool3 && bool4;
  });

  if (!newDoms1.length) {
    return;
  };
  
  const targetDomIfon = newDoms1[0].getBoundingClientRect();
  const pressDomIfon = ifon.dom.getBoundingClientRect();

  const myTop = ifon.clientY < (targetDomIfon.top + (targetDomIfon.height / 2));
  const myBottom = ifon.clientY > (targetDomIfon.top + (targetDomIfon.height / 2));
  const pressDomIndex = state.domStructure.indexOf(ifon.dom);
  const targetDomIndex = state.domStructure.indexOf(newDoms1[0]);
  let bottomBool = null;
  let topBool = null;

  if ((pressDomIndex + 1) === targetDomIndex) {
    if (myTop) {
      return;
    } else if (myBottom) {
      bottomBool = true;
    }

  } else if ((pressDomIndex - 1) === targetDomIndex) {
    if (myTop) {
      topBool = true;
    } else if (myBottom) {
      return;
    }
  } else {
    if (myTop) {
      topBool = true;
    } else if (myBottom) {
      bottomBool = true;
    }
  };


  if (topBool || bottomBool && state.isTranEnd) {

    let x = ifon.clientX - pressDomIfon.left;
    let y = ifon.clientY - pressDomIfon.top;

    x = ifon.clientX - targetDomIfon.left + -x;
    y = ifon.clientY - targetDomIfon.top + -y;

    const tranItmes = [];

   for(let i = pressDomIndex < targetDomIndex ? pressDomIndex + 1 : targetDomIndex; i <= (pressDomIndex < targetDomIndex ? targetDomIndex : pressDomIndex - 1); i ++){
       tranItmes.push({
           id: state.dataStructure[i].id,
           top: pressDomIndex < targetDomIndex ? -pressDomIfon.height : pressDomIfon.height
       });
   }


   setState({
    ...state,
    tranIdIfon: tranItmes,
    isTranEnd: false,
   });

    /* state.domStructure.splice(targetDomIndex, 1, ...state.domStructure.splice(pressDomIndex, 1, state.domStructure[targetDomIndex]));
    state.dataStructure.splice(targetDomIndex, 1, ...state.dataStructure.splice(pressDomIndex, 1, state.dataStructure[targetDomIndex]));
    setState({
      ...state
    }); */
  };
};


function handleUp() {

};

function handleTransitionEnd(state, setState, props) {
  console.log('==')
      setState({
        ...state,
        isTranEnd: true
      })
};