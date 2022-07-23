
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
      pressIfon={state.pressIfon}
      addDom={(dom) => { addDom(dom, state, setState) }}
      removeDom={() => { removeDom() }}
      handleMouseDown={()=>{ handleMouseDown() }}
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

function handleMouseDown(){

};

function handleClick() {

};

function handleMove(ifon, state, setState) {
  
  
};


function handleUp() {

};

function handleTransitionEnd(state, setState, props) {
 
};