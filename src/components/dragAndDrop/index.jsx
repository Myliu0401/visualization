

import { useState, useEffect, createRef } from 'react';
import styles from './index.css';

export default function DragAndDrop(props) {

      const [state, setState] = useState({
            isPress: false,
            pressX: 0,
            pressY: 0,
            differenceX: 0,
            differenceY: 0,
            isDragAndDrop: false,
            isDragUp: false,
            dom: createRef(),
            dom1: createRef(),
      });

      useEffect(()=>{
         
         props.addDom(state.dom.current)
         return ()=>{
           props.removeDom(state.dom.current)
         };
      }, []);

      return (<div  
           className={`${styles.dragAndDrop}`}
           ref={state.dom}
           data-index={props.index}
           data-id={props.id}
           data-top={ props.finalY }
           style={{
              width: (state.isDragAndDrop || state.isDragUp) && getDomIfon(state.dom1).width,
              height: (state.isDragAndDrop || state.isDragUp) && getDomIfon(state.dom1).height,
              top: props.finalY
           }}
      >
        <div 
           className={`${styles.dragAndDrop_Box} ${state.isDragAndDrop ? styles.isDragAndDrop : ''} ${state.isDragUp ? styles.isDragUp : ''}`} 
           ref={state.dom1}
           onMouseDown={ (event)=>{ handleMouseDown(event, state, setState) } }
           onMouseMove={ (event)=>{ handleMouseMove(event, state, setState, props) } }
           onMouseUp={ (event)=>{ handleMouseUp(event, state, setState) } }
           onTransitionEnd={ (event)=>{ handleTransitionEnd(event, state, setState) } }
           style={{
               left: state.differenceX,
               top: state.differenceY,
               width: (state.isDragAndDrop || state.isDragUp) && getDomIfon(state.dom1).width,
               height: (state.isDragAndDrop || state.isDragUp) && getDomIfon(state.dom1).height
           }}
        >
          {props.children}
        </div>
      </div>);
};

DragAndDrop.defaultProps = {
  finalY: 0,
  finalX: 0
};


function getDomIfon(dom){
    const domIfon = dom.current.getBoundingClientRect();
    return domIfon;
};

function handleMouseDown({ clientX, clientY }, state, setState) {
  const dom1Ifon = state.dom1.current.getBoundingClientRect();
      setState({
        ...state,
        isPress: true,
        clientX: clientX - dom1Ifon.left,
        clientY: clientY - dom1Ifon.top
      });
};

function handleMouseMove({ clientX, clientY }, state, setState, props) {
    if(state.isPress){
        setState({
          ...state,
          isDragAndDrop: true,
          differenceX: clientX - state.clientX,
          differenceY: clientY - state.clientY
        });
        props.handleMove && props.handleMove({ clientX, clientY, dom: state.dom.current }) ;
    };
    
};

function handleMouseUp({ clientX, clientY }, state, setState) {
     const domIfon = state.dom.current.getBoundingClientRect(); 
     setState({
        ...state,
        isPress: false,
        isDragAndDrop: false,
        isDragUp: true,
        differenceX: domIfon.left,
        differenceY: domIfon.top
     });
};


function handleTransitionEnd({ clientX, clientY }, state, setState, props) {
    if(state.isDragUp){
       setState({
          ...state,
          isDragUp: false,
          differenceX: 0,
          differenceY: 0
       });
    };
};

