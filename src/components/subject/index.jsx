
import styles from './index.css';
import DragAndDrop from '@/components/dragAndDrop/index.jsx';

export default function Subject(props) {
      return (<div className={`${styles.Subject}`}>

            {generateChildren(props.dataStructure, props)}

      </div>);
};


function generateChildren(dataStructure, props) {
      return dataStructure.map((item) => {
            return <DragAndDrop
                  key={item.id}
                  addDom={props.addDom}
                  removeDom={props.removeDom}
                  handleMove={props.handleMove}
                  handleUp={props.handleUp}
                  handleClick={props.handleClick}
                  handleTransitionEnd={props.handleTransitionEnd}
                  tranIdIfon={props.tranIdIfon}
                  pressIfon={props.pressIfon}
            >
                  <div style={{ width: '100%', height: 189, boxShadow: '0px 0px 1px #008c8c' }}>{ item.id }</div>
            </DragAndDrop>
      });
};