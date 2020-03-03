import React from 'react';
import { Link } from 'react-router-dom'
import './NoteHeader.css'
// import LoadNote from '../LoadNote/LoadNote'

export default function NoteHeader(props)  {
  
    return (
        <div>
            <h2>
                <Link to={`/LoadNote/${props.id}`}>
                {props.name}
                </Link>
                </h2>
            <p>Date modified: {new Date(props.modified).toDateString()}</p> 
            <div         className="button-container">
                <button type="button" className="delete-note">Delete Notes</button>
            </div>
        </div>     
    )  

}
