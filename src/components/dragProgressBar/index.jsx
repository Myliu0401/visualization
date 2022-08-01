
import styles from './index.css';
import { useState, useEffect, createRef, useCallback } from 'react';

export default function DragProgressBar(props) {


  const [state, setState] = useState({
    isPress: false,
    isDragAndDrop: false,
    currntUpX: 0,
    pressX: 0,
    currntX: 0,
    dom: createRef(),
    value: ''
  });

  const func = useCallback(createAntiShakeFunc(1000, (...parameter)=>{
    handleValue(parameter[0], parameter[1], parameter[2], parameter[3])
  }),[]);


  useEffect(() => {
    const move = (event) => {
      handleMouseMove(event, state, setState, props)
    };

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, [state.isPress]);

  useEffect(() => {
    const up = (event) => {
      handleMouseUp(event, state, setState, props);
    };
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mouseup', up);
    }
  }, [state.currntX, state.currntUpX]);

  useEffect(() => {
    if (Number(state.value) !== Number(props.value)) {
      const value1 = props.value < props.minimum ? props.minimum : props.value > props.maximum ? props.maximum : props.value;
      handleValue(value1, state, setState, props);
    }
  }, [props.value]);


  return (<div className={`${styles.DragProgressBar}`}>
    <span className={`${styles.DragProgressBar_title}`}>test</span>
    <div className={`${styles.DragProgressBar_subject}`} ref={state.dom}>
      <p
        className={`${styles.DragProgressBar_subject_p}`}
        style={{ width: state.currntX }}>
        <span
          className={`${styles.DragProgressBar_subject_p_span} ${state.isPress ? styles.DragProgressBar_subject_p_span_press : ''}`}
          style={{
            left: state.currntX
          }}
          onMouseDown={(event) => {
            handleMouseDown(event, state, setState, props);
          }}
        ></span>
      </p>
    </div>
    <input
      className={`${styles.DragProgressBar_input}`}
      value={state.value}
      onChange={(event)=>{
        handleInput(event, state, setState, props, func);
      }} />
  </div>);
};


DragProgressBar.defaultProps = {
  minimum: 0,
  maximum: 100,
  value: 16
};


function handleMouseDown({ clientX, clientY }, state, setState, props) {
  setState({
    ...state,
    isPress: true,
    pressX: clientX
  });
};

function handleMouseMove({ clientX, clientY }, state, setState, props) {
  if (!state.isPress) {
    return;
  };
  const domIfon = state.dom.current.getBoundingClientRect();
  const x = clientX - state.pressX + state.currntUpX;
  if ((x <= 0) || (domIfon.width <= x)) {
    return;
  };
  const totalL = props.maximum - props.minimum;
  const decimal = totalL / domIfon.width;
  setState({
    ...state,
    value: Math.round(decimal * x + props.minimum),
    currntX: x
  });
  props.myMouseMove && props.myMouseMove(Math.round(decimal * x + props.minimum));
};

function handleMouseUp({ clientX, clientY }, state, setState, props) {
  setState({
    ...state,
    isPress: false,
    isDragAndDrop: false,
    pressX: 0,
    currntUpX: state.currntX
  });

};

function handleValue(value, state, setState, props) {

   const domIfon = state.dom.current.getBoundingClientRect();
   const totalL = props.maximum - props.minimum;
   const decimal = domIfon.width / totalL;
   const leg = decimal * (value - props.minimum) / domIfon.width;

   setState({
    ...state,
    currntUpX: Math.round(domIfon.width * leg),
    currntX: Math.round(domIfon.width * leg),
    value
   });
   
};

function handleInput(event, state, setState, props, func){
     let value = event.target.value;
     value = value.replace(/\D/g,'');
     value = value < props.minimum ? props.minimum : value > props.maximum ? props.maximum : value;
     setState({
      ...state,
      isPress: false,
      isDragAndDrop: false,
      pressX: 0,
      value: value
     });
     func(Math.round(value), state, setState, props);
};

function createAntiShakeFunc(time, func){
   let identification = null;
   return (...parameter)=>{
      clearTimeout(identification)
      identification = setTimeout(()=>{
          func(...parameter);
      }, time);
   };
};