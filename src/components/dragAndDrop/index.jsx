

import { useState, useEffect, createRef } from 'react';
import styles from './index.css';

export default function DragAndDrop(props) {

      const [state, setState] = useState({
            isPress: null,
            pressX: 0,
            pressY: 0,
            differenceX: 0,
            differenceY: 0,
            isPressMove: null,
            isAndmin: null,
            dom: createRef()
      });

      useEffect(()=>{
         props.addDom(state.dom.current)
         return ()=>{
           props.removeDom(state.dom.current)
         };
      }, []);

      return (<div  
            ref={state.dom}
            style={{ top: state.differenceY || props.finalY, left: state.differenceX || props.finalX }} 
            className={`${styles.DragAndDrop} ${state.isAndmin ? styles.isAndmin : ''} ${state.isPressMove ? styles.isActive : ''}`}
            onMouseDown={(event) => { handleMouseDown(event, state, setState) }}
            onMouseMove={(event) => { handleMouseMove(event, state, setState, props) }}
            onMouseUp={(event) => { handleMouseUp(event, state, setState) }}
            onTransitionEnd={(event) => { handleTransitionEnd(event, state, setState) }}
      >
            {props.children}
      </div>);
};

DragAndDrop.defaultProps = {
  finalY: 0,
  finalX: 0
}



function handleMouseDown({ clientX, clientY }, state, setState) {
      setState({
            ...state,
            isPress: true,
            pressX: clientX,
            pressY: clientY
      });
};

function handleMouseMove({ clientX, clientY }, state, setState, props) {

      if (state.isPress) {
            setState({
                  ...state,
                  differenceX: clientX - state.pressX,
                  differenceY: clientY - state.pressY,
                  isPressMove: true,
                  isAndmin: true
            });
            props.handleMove({ clientX, clientY, dom: state.dom.current });

      };
};

function handleMouseUp({ clientX, clientY }, state, setState) {
      setState({
            ...state,
            isPress: false,
            pressX: 0,
            pressY: 0,
            differenceX: 0,
            differenceY: 0,
            isPressMove: false,
            isAndmin: true
      });
};


function handleTransitionEnd(event, state, setState) {
      if(state.isAndmin){
         setState({
           ...state,
           isAndmin: false
         });
      }
};

