
import styles from './index.css';
import { useState, useEffect } from 'react';

export default function DragProgressBar(props){

   
    const [state, setState] = useState({
      isPress: false,
      isDragAndDrop: false,
      pressX: 0,
      pressY: 0,
      currntX: 0,
      currntY: 0
    });

    useEffect(()=>{
      const move = (event)=>{
        if(!state.isPress){
           return
        }
        handleMouseMove(event, state, setState, props)
      };
 
      window.addEventListener('mousemove', move);
      return ()=>{
        window.removeEventListener('mousemove', move);
      };
    }, [state.isPress, state.isDragAndDrop]);

    useEffect(()=>{
        const up = (event)=>{
          handleMouseUp(event, state, setState, props);
        };
        window.addEventListener('mouseup', up);
        return ()=>{
          window.removeEventListener('mouseup', up);
        }
    }, [state.currntX]);

window.state = state

    return (<div className={`${styles.DragProgressBar}`}>
      <span className={`${styles.DragProgressBar_title}`}>test</span>
      <div className={`${styles.DragProgressBar_subject}`}>
        <p className={`${styles.DragProgressBar_subject_p}`}>
          <span 
            className={`${styles.DragProgressBar_subject_p_span} ${state.isPress ? styles.DragProgressBar_subject_p_span_press : ''}`}
            style={{
              left: state.currntX
            }}
            onMouseDown={ (event)=>{ 
              handleMouseDown(event, state, setState, props) 
            }}
          ></span>
        </p>
      </div>
      <input className={`${styles.DragProgressBar_input}`}/>
    </div>);
};



function handleMouseDown({ clientX, clientY }, state, setState, props){
     setState({
        ...state,
        isPress: true,
        pressX: clientX,
        pressY: clientY,
     });

};


function handleMouseMove({ clientX, clientY }, state, setState, props){
   setState({
     ...state,
     isDragAndDrop: true,
     currntX: (clientX - state.pressX) + (state.isDragAndDrop ? 0 : state.currntX),
   });
};

function handleMouseUp({ clientX, clientY }, state, setState, props){
  console.log(state)
    setState({
      ...state,
      isPress: false,
      isDragAndDrop: false,
      pressX: 0,
      pressY: 0
    });

};