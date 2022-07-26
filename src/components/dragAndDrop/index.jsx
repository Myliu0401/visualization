

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
           className={`${props.isT ? styles.dragAndDrop : ''} ${styles.dragAndDrop1}`}
           ref={state.dom}
           data-index={props.index}
           data-id={props.id}
           data-top={ props.finalY }
           style={{
              width: (state.isDragAndDrop || state.isDragUp) && getDomIfon(state.dom1).width,
              height: (state.isDragAndDrop || state.isDragUp) && getDomIfon(state.dom1).height,
              top: props.finalY,
              backgroundColor: 'transparent'
           }}
      >
        <div 
           className={`${styles.dragAndDrop_Box} ${state.isDragAndDrop ? styles.isDragAndDrop : ''} ${state.isDragUp ? styles.isDragUp : ''} ${styles.itemDrop} ${state.isDragAndDrop ? styles.wtill : ''}`} 
           ref={state.dom1}
           onMouseDown={ (event)=>{ handleMouseDown(event, state, setState, props) } }
           onMouseMove={ (event)=>{ handleMouseMove(event, state, setState, props) } }
           onMouseUp={ (event)=>{ handleMouseUp(event, state, setState, props) } }
           onTransitionEnd={ (event)=>{ handleTransitionEnd(event, state, setState, props) } }
           style={{
               left: state.differenceX,
               top: props.pressIfon ? props.id.toString() === props.pressIfon.id.toString() ? props.pressIfon.top : state.differenceY : state.differenceY,
               width: (state.isDragAndDrop || state.isDragUp) && getDomIfon(state.dom1).width,
               height: (state.isDragAndDrop || state.isDragUp) && getDomIfon(state.dom1).height
           }}
        >
          {props.children}
        </div>
          <div className={`${(state.isDragAndDrop ? true : state.isDragUp || false ) || styles.dragAndDrop1_close}`}> { (state.isDragAndDrop ? true : state.isDragUp || false ) ? null : 'X' } </div> 
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

function handleMouseDown({ clientX, clientY }, state, setState, props) {
  if(!props.isItOnTheTarget){
      return
  }

  const dom1Ifon = state.dom1.current.getBoundingClientRect();
      setState({
        ...state,
        isPress: true,
        clientX: clientX - dom1Ifon.left,
        clientY: clientY - dom1Ifon.top,
      });

  props.handleDown && props.handleDown({ dom: state.dom,  id: props.id, clientX, clientY });

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

function handleMouseUp({ clientX, clientY }, state, setState, props) {
     
     const domIfon = state.dom.current.getBoundingClientRect(); 
     if(state.isDragAndDrop){
        setState({
           ...state,
           isPress: false,
           isDragAndDrop: false,
           isDragUp: true,
           differenceX: domIfon.left,
           differenceY: domIfon.top
        });
        props.handleUp && props.handleUp({ clientX, clientY, dom: state.dom.current });
     };
     
};

function handleTransitionEnd({ clientX, clientY }, state, setState, props) {
    if(state.isDragUp){
       setState({
          ...state,
          isPress: false,
          pressX: 0,
          pressY: 0,
          differenceX: 0,
          differenceY: 0,
          isDragAndDrop: false,
          isDragUp: false,
       });
       props.handleTransitionEnd && props.handleTransitionEnd()
    };
};

