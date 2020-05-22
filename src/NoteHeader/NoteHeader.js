import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './NoteHeader.css'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'



export default class NoteHeader extends Component {
    static contextType = NotefulContext;

    deleteNoteRequest = e =>{
        e.preventDefault();
        const noteId = this.props.id;
        fetch(config.API_NOTEID_ENDPOINT+'/'+noteId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(res => {
            if (!res.ok) {
            throw  `Could not delete note ${noteId}`
            }
            return;
        })
        .then(() => {
            this.context.deleteNote(noteId)
        })
        .catch(error => {
            console.error(error)
        })
    }
    render(){
        return (
            <div className="container-div">
                <h2 className="note-name">
                    <Link to={`/LoadNote/${this.props.id}`}>
                    {this.props.name}
                    </Link>  
                </h2>
                <span>Date modified: {new Date(this.props.modified).toDateString()}</span> 
                <div className="button-container-header">
                    <button 
                        type="button" className="delete-note"
                        aria-label="delete-note"
                        onClick={this.deleteNoteRequest}
                        >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </button>    
                </div>
            </div>     
        )  
    }
}

NoteHeader.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired
}