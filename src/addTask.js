import React,{useState} from 'react'
import {Button,InputGroup,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addDoc,collection } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
const AddTask = (props) => {
  const navigate=useNavigate();
  const [newTask,setNewTask]=useState("");
  const [newPriority,setNewPriority]=useState("");
  const addTask= async ()=>{
    await addDoc(collection(db, "tasks"), {
      task:newTask,
        priority:newPriority
    });
    // navigate("/");
    
  }
  
  return (
    <div style={{padding:'20px 10px'}}>
     <InputGroup style={{width:'40%'}}>
        <Form.Control aria-label="Text input with checkbox" placeholder='Enter your Task' onChange={(e)=>setNewTask(e.target.value)}/>
      </InputGroup>
      <Form.Select aria-label="Default select example" style={{width:'20%'}} onChange={(e)=>setNewPriority(e.target.value)}>
        <option value="null">Set Priority</option>
        <option value="high">High</option>
        <option value="moderate">Moderate</option>
        <option value="low">Low</option>
      </Form.Select>
      <Button onClick={addTask}>Add Task</Button>

    </div>
  )
}

export default AddTask;