
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

function handleClick() {

};

function handleMove(ifon, state, setState) {
  const pressDomIfon = ifon.dom.getBoundingClientRect();
  let activeDom = state.domStructure.filter((dom)=>{
       const domIfon = dom.getBoundingClientRect();
       const bool = (ifon.clientX > domIfon.left) && 
                    (ifon.clientY > domIfon.top) && 
                    (ifon.clientX < (domIfon.left + domIfon.width)) && 
                    (ifon.clientY < (domIfon.top + domIfon.height));
       return bool;
  });
  
  // 获取目标dom
  activeDom = activeDom.length ? activeDom.length > 1 ? activeDom.filter((dom)=>{return dom !== ifon.dom})[0] : activeDom[0] : null;
  
  if(activeDom !== ifon.dom && activeDom !== null){
         
         const targetDomIfon = activeDom.getBoundingClientRect();
         const pressDomIndex = state.domStructure.indexOf(ifon.dom);
         const targetDomIndex = state.domStructure.indexOf(activeDom);

         const upAndDown = (ifon.clientY < (targetDomIfon.height / 2 + targetDomIfon.top)) ? 'top' : 'bottom';

         const point = (pressDomIndex + 1 === targetDomIndex) ? 'prev' : (pressDomIndex - 1 === targetDomIndex) ? 'next' : ((pressDomIndex + 1 !== targetDomIndex) || (pressDomIndex - 1 !== targetDomIndex)) && 'no';

         const bool = (point === 'prev' && upAndDown === 'bottom') || (point === 'next' && upAndDown === 'top') || point === 'no';
         
         let startIndex = null;
         let endIndex = null;
     
         if(pressDomIndex < targetDomIndex && point === 'prev'){
             startIndex = pressDomIndex + 1;
             endIndex = targetDomIndex;
         }else if(pressDomIndex > targetDomIndex && point === 'next'){ 
             startIndex = targetDomIndex;
             endIndex = pressDomIndex - 1;
         }else if(point === 'no' && upAndDown === 'top'){
             startIndex = pressDomIndex < targetDomIndex ? pressDomIndex + 1 : targetDomIndex;
             endIndex = pressDomIndex < targetDomIndex ? targetDomIndex - 1 : pressDomIndex - 1;
         }else if(point === 'no' && upAndDown === 'bottom'){
             startIndex = pressDomIndex < targetDomIndex ? pressDomIndex + 1 : targetDomIndex + 1;
             endIndex = pressDomIndex < targetDomIndex ? targetDomIndex : pressDomIndex - 1;
         };
         
         
         if(bool){
           const doms = [];
           for(let i = startIndex; i <= endIndex; i++){
                doms.push(state.domStructure[i]);
           };
           
           for(let i = 0; i < state.domStructure.length; i++){
               if(doms.includes(state.domStructure[i])){
                
               }else{

               }
           };
          
         }
  }
};


function handleUp() {

};

function handleTransitionEnd(state, setState, props) {
 
};