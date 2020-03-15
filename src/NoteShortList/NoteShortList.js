import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import './NoteShortList.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import NoteHeader from '../NoteHeader/NoteHeader'
import NotefulContext from '../NotefulContext'
import { generateFolderNotes} from '../helpful-functions'
import PropTypes from 'prop-types'

export default class NoteShortList extends Component {
    static contextType = NotefulContext;
    static defaultProps = {
        match: {
            params: {}
        }
    }

    render(){
        const folderId = this.props.match.params.folderId;
        const notesList = generateFolderNotes(this.context.notes,folderId);
        return (
            <section>
                <ul>
                    {notesList.map(item=>
                    <li key={item.id}>
                        <NoteHeader
                            id={item.id}
                            name={item.name}
                            modified={item.modified}
                        />
                    </li>
                    )}
                </ul>
                <div className="button-container-notes">
                    <Link to={'/add-note'}>
                        <button 
                            className="add-note"
                            aria-label="submit"
                            type="submit">
                            <FontAwesomeIcon icon={faPlus}/> Note
                        </button>   
                    </Link>  
                </div>
            </section>
        )     
    }
     
}

NoteShortList.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            folderId: PropTypes.string.isRequired
        })
    }).isRequired
}