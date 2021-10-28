import React from 'react'
import { useHistory } from "react-router-dom";


function Todo({todo}) {
    const history = useHistory();
    const todoStyle={
        display:'flex',
        marginTop:'20px'
    }
    const textStyle={
        backgroundColor:'#1B7089',
        color:'white',
        width:'80%',
        marginRight:'10px',
        padding:'10px',
        borderRadius: "10px"
    }
    const btnStyle={
        backgroundColor:'#CA9C18',
        borderRadius: "10px"
    }
    return (
        <div style={todoStyle}>
            <div style={textStyle}>
                {todo.text}
            </div>
            <button className="btn" style={btnStyle} onClick={()=>history.push(`/${todo._id}`)}>
                Details
            </button>
        </div>
    )
}

export default Todo
