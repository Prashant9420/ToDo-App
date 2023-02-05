import React,{useState,useEffect,useRef} from 'react'
import {BrowserRouter as Router,Routes,Route, Link, useNavigate} from 'react-router-dom';
import { getDocs, setDoc, updateDoc, deleteDoc, doc, addDoc, collection } from 'firebase/firestore';
import {Button,InputGroup,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
import './App.css';
import checkImg from './checked.png'
import AddTask from './addTask';
import {db} from './firebaseConfig'
import { async } from '@firebase/util';
function App(){
  // const navigate=useNavigate();
  const [tasks,setTasks]=useState([]);
  const tasksCollectionRef=collection(db,"tasks");
  const [nTasks,setNtasks]=useState(0);
  const box = useRef(0);
  const [toUpdate,setToUpdate]=useState(false);
  const map=new Map([
    ["high","red"],
    ["moderate","yellow"],
    ["low","yellowgreen"]
  ]);
  const getTasks=async ()=>{
    const data=await getDocs(tasksCollectionRef);
    setTasks(data.docs.map((doc)=>(tasks,{"task":doc.data().task,"priority":doc.data().priority,"id":doc.id})))
    // console.log(tasks);
    setNtasks(tasks.length);
  }
  const handleComplete= async (id,n)=>{
    await deleteDoc(doc(db,"tasks",id));
  }
  useEffect(()=>{ 
    getTasks();
  },[tasks]);
  return(
      <Router>
      <h1 style={{textDecoration:'underline'}}>Your Tasks</h1>
       {tasks.map((task,n)=>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'40vw',padding:'10px 5px'}}>
        <div style={{borderRadius:'25px',fontSize:'larger',backgroundColor:map.get(task.priority),border:'2px solid black',padding:'15px 10px',color:'black',cursor:'default',width:'60%'}}>{task.task}</div>
      <div className='completeTask' onClick={()=>handleComplete(task.id,n)}><div className='check'></div><span style={{padding:'0px 20px'}}>Task Completed</span></div>
      </div>
       )}
       <Link to="/addTask" style={{textDecoration:'none',}}>Add Task</Link>
       <Routes>
        <Route path='/addTask' element={<AddTask ref={tasksCollectionRef}/>}/>
       </Routes>
     </Router>
  );
}
export default App;