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
        const folder_id = this.props.match.params.folder_id;
        const numFolder_id = Number(folder_id)
        const notesList = generateFolderNotes(this.context.notes,numFolder_id);
   
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
            folder_id: PropTypes.string
        })
    }).isRequired
}