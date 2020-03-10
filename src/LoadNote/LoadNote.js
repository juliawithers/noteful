import React, { Component } from 'react'
import './LoadNote.css'
import NotefulContext from '../NotefulContext'
import { findNote} from '../helpful-functions'
import { Link } from 'react-router-dom'
import NotefulError from '../NotefulError'

export default class LoadNote extends Component{
    static contextType = NotefulContext;

    deleteNoteRequest =e =>{
        e.preventDefault();
        const noteId = this.props.match.params.itemId
        fetch(`http://localhost:9090/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
        .then(res => {
            if (!res.ok) {
                throw `Could not delete note ${noteId}`
            }
            return;
        })
        .then(() => {
            this.props.history.push('/')
            this.context.deleteNote(noteId)
        })
        .catch(error => {
            console.error(error)
        })
    }

    render(){
        const itemId = this.props.match.params.itemId;
        const note = findNote(this.context.notes,itemId,this.props)
        return(
            <div className="loaded-note">
                <article id={note.id} className="article">
                    <div>
                        <h2>{note.name}</h2>
                        <NotefulError>
                            <p>Date modified: {new Date(note.modified).toDateString()}</p>    
                        </NotefulError>
                        
                    </div>
                    <div className="button-container-header">
                        <NotefulError>
                            <Link to={'/'}>
                            <button 
                                type="button" className="delete-note"
                                onClick={this.deleteNoteRequest}
                                >
                                Delete Notes
                            </button>
                            </Link>    
                        </NotefulError>     
                    </div>
                </article>
                <article className="content">
                    {note.content}
                </article>
            </div>
            
        )
    }
}