import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './NoteHeader.css'
import NotefulContext from '../NotefulContext'

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
            <div>
                <h2>
                    <Link to={`/LoadNote/${this.props.id}`}>
                    {this.props.name}
                    </Link>
                    </h2>
                <p>Date modified: {new Date(this.props.modified).toDateString()}</p> 
                <div className="button-container">
                    <button 
                        type="button" className="delete-note"
                        onClick={this.deleteNoteRequest}
                        >
                        Delete Notes
                    </button>
                </div>
            </div>     
        )  
    }
}
