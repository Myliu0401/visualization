

export default function index(props){
   return (<div>
       <div>头部</div>
       { props.children }
       <div>尾部</div>
   </div>);
};