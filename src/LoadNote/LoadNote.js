import React, { Component } from 'react'
import './LoadNote.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import NotefulContext from '../NotefulContext'
import { findNote} from '../helpful-functions'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class LoadNote extends Component{
    static contextType = NotefulContext;
    static defaultProps = {
        history: {
          goBack: () => {}
        },
        match: {
          params: {}
        }
      }

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
                            <p>Date modified: {new Date(note.modified).toDateString()}</p>    
                    </div>
                    <div className="button-container-loaded">
                        <Link to={'/'}>
                        <button 
                            type="button" className="delete-note"
                            onClick={this.deleteNoteRequest}
                            >
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                        </Link>      
                    </div>
                </article>
                <article className="content">
                    {note.content}
                </article>
            </div>
            
        )
    }
}

LoadNote.propTypes = {
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            itemId: PropTypes.string.isRequired
        })
    }).isRequired
}