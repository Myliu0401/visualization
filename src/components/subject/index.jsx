
import styles from './index.css';
import DragAndDrop from '@/components/dragAndDrop/index.jsx';

export default function Subject(props) {
      return (<div className={`${styles.Subject}`}>

            {generateChildren(props.dataStructure, props)}

      </div>);
};


function generateChildren(dataStructure, props) {
      return dataStructure.map((item, index) => {
            return <DragAndDrop
                  key={item.id}
                  addDom={props.addDom}
                  isItOnTheTarget={props.isItOnTheTarget}
                  isT={props.exceptPressDoms.filter(obj => obj.id.toString()===item.id.toString()).length ? props.exceptPressDoms.filter(obj => obj.id.toString()===item.id.toString())[0].isT : false}
                  removeDom={props.removeDom}
                  handleDown={props.handleDown}
                  handleMove={props.handleMove}
                  handleUp={props.handleUp}
                  handleClick={props.handleClick}
                  handleTransitionEnd={props.handleTransitionEnd}
                  finalY={props.tranIdIfon ? getItemIfon(props, item.id) : 0}
                  pressIfon={props.pressIfon}
                  index={index}
                  id={item.id}
            >
                  <div style={{ width: '100%', height: 189, boxShadow: '0px 0px 1px #008c8c' }}>{ item.id }</div>
            </DragAndDrop>
      });
};


function getItemIfon(props, id){
    if(!props.tranIdIfon){
       return 0 ;
    };
   
    const s = props.tranIdIfon.filter((child)=>{
         return child.id.toString() === id.toString()
    });

    return s.length ? s[0].top : 0
}