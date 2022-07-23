
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
      handleDown={(obj)=>{ handleDown(obj, state, setState) }}
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

function handleDown(obj, state, setState){
  
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
     
     let targetDom = state.domStructure.filter((dom)=>{
        const domIfon = dom.getBoundingClientRect();
        const bool = ((domIfon.top + domIfon.height) > ifon.clientY) && ((domIfon.left + domIfon.width) > ifon.clientX) && (domIfon.top < ifon.clientY) && (domIfon.left < ifon.clientX);
        return ifon.dom !== dom && bool;
     });
     targetDom = targetDom[0];
     if(!targetDom){
        return ;
     };

     const pressDomIndex = state.domStructure.indexOf(ifon.dom);
     const targetDomIndex = state.domStructure.indexOf(targetDom);
     const pressDomIfon = state.domStructure[pressDomIndex].getBoundingClientRect();
     const targetDomIfon = state.domStructure[targetDomIndex].getBoundingClientRect();
     let isNextDoor = false;
     let upAndDown = null;
     
     if((pressDomIndex + 1) === targetDomIndex || (pressDomIndex - 1) === targetDomIndex){
      isNextDoor = true;  
      
     }else{

     }
     upAndDown = ifon.clientY > (targetDomIfon.top + targetDomIfon.height / 2) ? 'bottom' : 'top';
     
   
};

function calculateCoordinates(doms, value, id, pressIfon){
 
    const s = [];
    for(let i=0; i < doms.length; i++){
      const dom = doms[i];
      const domIfon = dom.getBoundingClientRect();
      if(dom.dataset.id.toString() !== id.toString()){
            
          if((domIfon.top + domIfon.height) <= value){
              s.push({
                id: dom.dataset.id,
                top: -pressIfon.height
              })
          }else{
            s.push({
              id: dom.dataset.id,
              top: 0
            })
          }
     };
    }
  
    return s;
};

function getPrevious(doms, value){
  
     for(let i = 0; i< doms.length; i++){
        const ifon = doms[i].getBoundingClientRect();
        if((ifon.height + ifon.top) === (value)){
              return ifon
        }
     }
};



function handleUp() {

};

function handleTransitionEnd(state, setState, props) {
 
};