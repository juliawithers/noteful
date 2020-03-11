import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './NoteHeader.css'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'

export default class NoteHeader extends Component {
    static contextType = NotefulContext;

    deleteNoteRequest = e =>{
        e.preventDefault();
        const noteId = this.props.id;
        console.log('deleteNoteRequest ran')
        fetch(`http://localhost:9090/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
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
                        onClick={this.deleteNoteRequest}
                        >
                        Delete Note
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