import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import './NoteShortList.css'
import NoteHeader from '../NoteHeader/NoteHeader'
import NotefulContext from '../NotefulContext'
import { generateFolderNotes} from '../helpful-functions'
import NotefulError from '../NotefulError'

export default class NoteShortList extends Component {
    static contextType = NotefulContext;
    static defaultProps = {
        match: {
            params: {}
        }
    }

    render(){
        const folderId = this.props.match.params.folderId;
        const notesList = generateFolderNotes(this.context.notes,folderId,this.props);
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
                <div className="button-container">
                    <NotefulError>
                        <Link to={'/add-note'}>
                            <button type="submit">
                                Add Note
                            </button>   
                        </Link>  
                    </NotefulError>
                    
                    
                </div>
            </section>
        )     
    }
     
}