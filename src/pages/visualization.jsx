
import Subject from '@/components/subject/index.jsx';

import { useState, useEffect } from 'react';

import styles from './visualization.css';

export default function Visualization(props) {

  const [state, setState] = useState({
    dataStructure: [{ id: 1 }, { id: 2 }, { id: 3 }],
    domStructure: []
  });
window.state = state
  return (<div className={`${styles.Visualization}`}>

    <Subject
      dataStructure={state.dataStructure}
      addDom={(dom) => { addDom(dom, state, setState) }}
      removeDom={() => { removeDom() }}
      handleMove={ (ifon)=>{ handleMove(ifon, state, setState) } }
      handleUp={ ()=>{ handleUp() } }
      handleClick={ ()=>{ handleClick() } }
      handleTransitionEnd={ ()=>{ handleTransitionEnd() } }
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

function handleClick(){

};

function handleMove(ifon, state, setState){
      const newDoms = state.domStructure.filter( dom => ifon.dom !== dom );
      const newDoms1 = newDoms.filter((dom)=>{
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

      if(!newDoms1.length){
         return
      };

      const domIfon = newDoms1[0].getBoundingClientRect();
      
      const myTop = ifon.clientY < (domIfon.top + (domIfon.height / 2));
      const myBottom = ifon.clientY > (domIfon.top + (domIfon.height / 2));
      const pressDomIndex = state.domStructure.indexOf(ifon.dom);
      const targetDomIndex = state.domStructure.indexOf(newDoms1[0]);
      const bottomBool = ((pressDomIndex + 1) === targetDomIndex && myBottom && !myTop) || ((pressDomIndex - 1 !== 0) && (pressDomIndex - 1 !== targetDomIndex));
   


      if(myTop && !myBottom && pressDomIndex){
            console.log('top')
      }else if(bottomBool){
            console.log('bottom')
      }

};


function handleUp(){

};

function handleTransitionEnd(){

};