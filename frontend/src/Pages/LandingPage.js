import React from 'react'
import Container from '../components/Container'
import {useState,useEffect} from 'react';
import axios from 'axios'
import Loading from '../components/Loading';
import Todo from '../components/Todo'
import { useHistory } from "react-router-dom";

function LandingPage() {
    const [todo,setTodo]=useState([]);
    const [loading,setLoading]=useState(true);
    const [err,setErr]=useState();
    const history = useHistory();
    const fetchData=async()=>{
      try {
        const {data}=await axios.get(`http://localhost:5000/task`);
        setTodo(data);
        //console.log(data)
        setLoading(false)
      } catch (e) {
        setErr(e.message);
      }
    }
    useEffect(()=>{
      fetchData();
    },[])

    const btnStyle={
        backgroundColor:'#CA9C18',
        borderRadius: "10px",
    }
    return (
        <React.Fragment>
            <h1 style={{textAlign:'center',color:'white',marginTop:'20px'}}>Todo's</h1>
            <center>
                <button className="btn" style={btnStyle} onClick={()=>history.push(`/add`)}>Add Todo</button>
            </center>
            {loading?<Loading />:<Container>
                {todo.map((todo)=><Todo key={todo._id} todo={todo}/>)}
            </Container>}
      </React.Fragment>
    )
}

export default LandingPage
