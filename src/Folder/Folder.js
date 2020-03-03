import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Folder.css'

export default function Folder(props) {
    return(
        <div>
            {props.folders.map(item => 
                <article key={item.id}>
                    <h2>
                    <Link to={`/folder/${item.id}`}>
                    {item.name}
                    </Link>
                    </h2>
                </article> )}
            <button className="add-folder">
                Add Folder    
            </button>                    
        </div>
    )
}


