import React from 'react'
import {useState,useEffect} from 'react';

function TodoPage(props) {
    const id=props.match.params.id;
    const [todo,setTodo]=useState();
    return (
        <div>
            {id}
        </div>
    )
}

export default TodoPage
