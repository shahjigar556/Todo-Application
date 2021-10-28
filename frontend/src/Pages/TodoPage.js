import React from 'react'
import {useState,useEffect} from 'react';
import Container from '../components/Container'
import {Form} from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";
import Loading from '../components/Loading'

function TodoPage({match}) {
    const id=match.params.id;
    const [todo,setTodo]=useState();
    const [text,setText]=useState();
    const [desc,setDesc]=useState();
    const [status,setStatus]=useState()
    const [loading,setLoading]=useState(true)
    const history=useHistory()

    const fetchData=async()=>{
        try {
          const {data}=await axios.get(`http://localhost:5000/task/${id}`);
          setTodo(data);
          setText(data.text);
          setDesc(data.description)
          setStatus(data.status);
          console.log(data)
          setLoading(false)
        } catch (e) {
          console.log(e.message);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])


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
        color:'white',
        marginRight:'10px'
    }

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
            console.log(obj)
            const {data}=await axios.put(`http://localhost:5000/task/${id}`,obj);
            Swal.fire(
                'Good job!',
                'Task Updated successfully',
                'success'
            )
            history.push('/')
        } catch (err) {
            console.log(err.message)
        }
    }
    const handleDelete=async()=>{
        Swal.fire({
            title: 'Do you want to Delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const {data}=await axios.delete(`http://localhost:5000/task/${id}`);
                    Swal.fire('Deleted!', '', 'success');
                    history.push('/')
              } catch (err) {
                  console.log(err.message)
              }

            } else if (result.isDenied) {
              Swal.fire('Task not deleted', '', 'info')
              return ;
            }
          })
    }
    return (
        <React.Fragment>
            <h1 style={{textAlign:'center',color:'white',marginTop:'20px'}}>Edit Todo</h1>
         {loading?<Loading/>:<Container>
            <input value={text} type="text" style={inputStyle} placeholder="Enter heading" onChange={(e)=>setText(e.target.value)}/>
            <br/>
            <input value={desc} type="text" style={inputStyle} placeholder="Enter Description" onChange={(e)=>setDesc(e.target.value)}/>
            <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                        className="newProject-text-field1"
                        as="select"
                        onChange={(e)=>setStatus(e.target.value)}
                        style={inputStyle}
                        value={status}
                    >
                        <option style={{color:"white"}} value={1}>Status</option>
                        <option style={{color:"white"}} value='new'>New</option>
                        <option style={{color:"white"}} value='pending'>Pending</option>
                        <option style={{color:"white"}} value='completed'>Completed</option>
                    </Form.Control>
            </Form.Group>
            <div style={{display:'flex',justifyContent:'center'}}>
                <button className="btn" style={btnStyle} onClick={handleSave}>Save</button>
                <button className="btn" style={btnStyle} onClick={handleDelete}>Delete</button>
            </div>
        </Container>}
         
    </React.Fragment>
    )
}

export default TodoPage
