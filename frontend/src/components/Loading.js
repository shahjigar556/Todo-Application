import React from 'react'
import {Spinner} from 'react-bootstrap'

function Loading() {
    return (
        <div style={{textAlign:'center',paddingTop:'30px'}}>
            <Spinner animation="border" size='lg'/>
        </div>
    )
}

export default Loading
