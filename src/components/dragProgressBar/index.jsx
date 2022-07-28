
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
      const up = (event)=>{
        if(!this.props){
          return;
        };
        handleMouseUp(event, state, setState, props);
      };
      wdinow.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
      return ()=>{
        widnow.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      };
    }, [state.isPress, state.isDragAndDrop]);


    return (<div className={`${styles.DragProgressBar}`}>
      <span className={`${styles.DragProgressBar_title}`}>test</span>
      <div className={`${styles.DragProgressBar_subject}`}>
        <p className={`${styles.DragProgressBar_subject_p}`}>
          <span 
            className={`${styles.DragProgressBar_subject_p_span}`}
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

function handleMouseUp({ clientX, clientY }, state, setState, props, move, moup){
    setState({
      
      isPress: false,
      isDragAndDrop: false,
      pressX: 0,
      pressY: 0
    });

};