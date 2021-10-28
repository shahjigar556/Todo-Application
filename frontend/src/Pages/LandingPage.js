import React from 'react'
import Container from '../components/Container'
import {useState,useEffect} from 'react';
import axios from 'axios'
import Loading from '../components/Loading';
import Todo from '../components/Todo'
import { useHistory } from "react-router-dom";
import {Form} from 'react-bootstrap'

function LandingPage() {
    const [todo,setTodo]=useState([]);
    const [loading,setLoading]=useState(true);
    const [err,setErr]=useState();
    const [status,setStatus]=useState('all');
    const history = useHistory();
    const fetchData=async()=>{
      try {
        const {data}=await axios.get(`http://localhost:5000/task?status=${status}`);
        setTodo(data);
        //console.log(data)
        setLoading(false)
      } catch (e) {
        setErr(e.message);
      }
    }
    useEffect(()=>{
      fetchData();
    },[loading,status])

    const inputStyle={
        width:'100%',
        marginBottom:'20px',
        backgroundColor:"white",
        fontWeight:'bold',
        fontSize:'18px',
        border: '0',
        height:'40px',
        padding:"5px"
    }

    const btnStyle={
        backgroundColor:'#CA9C18',
        borderRadius: "10px",
    }

    const handleStatus=(val)=>{
        setStatus(val);
        setLoading(true)
        fetchData();
    }
    return (
        <React.Fragment>
            <h1 style={{textAlign:'center',color:'white',marginTop:'20px'}}>Todo's</h1>
            <center>
                <button className="btn" style={btnStyle} onClick={()=>history.push(`/add`)}>Add Todo</button>
            </center>
            {loading?<Loading />:<Container>
                <div style={{display:'flex',justifyContent:'center',color:'white'}}>
                    
                    <div style={{width:'25px',height:"25px",backgroundColor:'#BF07AC'}}></div>
                    <p style={{marginRight:"10px",marginLeft:"5px"}}>Pending</p>
                    <div style={{width:'25px',height:"25px",backgroundColor:'#4BB543'}}></div>
                    <p style={{marginRight:"10px",marginLeft:"5px"}}>Completed</p>
                    <div style={{width:'25px',height:"25px",backgroundColor:'#1B7089'}}></div>
                    <p style={{marginRight:"10px",marginLeft:"5px"}}>New</p>
                </div>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                        className="newProject-text-field1"
                        as="select"
                        value={status}
                        onChange={(e)=>handleStatus(e.target.value)}
                        style={inputStyle}
                    >
                        <option value='all'>All</option>
                        <option value='new'>New</option>
                        <option value='pending'>Pending</option>
                        <option value='completed'>Completed</option>
                    </Form.Control>
            </Form.Group>
                {todo.length==0 && <p style={{color:'white'}}>No Todo's</p>}
                {todo.length!=0 && todo.map((todo)=><Todo key={todo._id} todo={todo}/>)}
            </Container>}
      </React.Fragment>
    )
}

export default LandingPage
