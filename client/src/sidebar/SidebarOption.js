import React from 'react'
import "./SidebarOption.css"

function SidebarOption({active, text, Icon,path}) {
    return (
        <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
            <Icon />
            <a style={{textDecoration:"none"}} href={path}> <h2>{text}</h2></a>
        </div>
    )
}

export default SidebarOption
