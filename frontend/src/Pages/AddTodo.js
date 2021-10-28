import React from 'react'
import Container from '../components/Container'
import './add-todo.css'
import {Form} from 'react-bootstrap'
import {useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'

function AddTodo() {
    const inputStyle={
        width:'100%',
        marginBottom:'20px',
        backgroundColor:"#1B7089",
        color:"white",
        fontWeight:'bold',
        fontSize:'18px',
        border: '0',
        height:'40px',
        padding:"5px"
    }
    const btnStyle={
        backgroundColor:'#CA9C18',
        borderRadius: "10px",
        color:'white'
    }
    const [text,setText]=useState();
    const [desc,setDesc]=useState();
    const [status,setStatus]=useState('new')
    const history=useHistory();

    const handleSave=async ()=>{
        try {
            if(!text || !desc){
                if(!text && !desc){
                    Swal.fire('Please Enter Text and description')
                    return;
                }
                if(!text){
                    Swal.fire('Please Enter Heading')
                    return;
                }
                if(!desc){
                    Swal.fire('Please Enter Description')
                    return;
                }
                
            }
            const obj={
                text,
                description:desc,
                status
            }
            const {data}=await axios.post(`http://localhost:5000/task`,obj);
            Swal.fire(
                'Good job!',
                'Successfully Saved!',
                'success'
            )
            history.push('/')
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <React.Fragment>
            <h1 style={{textAlign:'center',color:'white',marginTop:'20px'}}>Add Todo</h1>
           <Container>
               <input type="text" style={inputStyle} placeholder="Enter heading" onChange={(e)=>setText(e.target.value)}/>
               <br/>
               <input type="text" style={inputStyle} placeholder="Enter Description" onChange={(e)=>setDesc(e.target.value)}/>
               <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                        className="newProject-text-field1"
                        as="select"
                        onChange={(e)=>setStatus(e.target.value)}
                        style={inputStyle}
                    >
                        <option style={{color:"white"}} value={1}>Status</option>
                        <option style={{color:"white"}} value='new'>New</option>
                        <option style={{color:"white"}} value='pending'>Pending</option>
                    </Form.Control>
            </Form.Group>
            <center>
                <button className="btn" style={btnStyle} onClick={handleSave}>Save</button>
            </center>
           </Container>
        </React.Fragment>
    )
}

export default AddTodo
