import React from 'react'
import './Left_Sidebar_Icons.css'

function Left_Sidebar_Icons({name,Icons}) {
    return (
        <div className="Sidebar_Icons">
           <Icons className="icon"/> {name}
        </div>
    )
}

export default Left_Sidebar_Icons
