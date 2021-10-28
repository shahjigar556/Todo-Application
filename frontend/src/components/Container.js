import React from 'react'
import './container.css'

function Container({children,width,padding}) {
    const containerStyle={
        background: '#3F3160',
        margin:'auto',
        width:'90%',
        padding:'30px',
    }
    return (
        <div className="container-style">
            {children}
        </div>
    )
}



export default Container