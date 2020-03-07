import React,{ Component } from 'react'
import './NoteShortList.css'
import NoteHeader from '../NoteHeader/NoteHeader'
import NotefulContext from '../NotefulContext'
import { generateFolderNotes} from '../helpful-functions'

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
                            // onDeleteNote={this.deleteNote}
                        />
                    </li>
                    )}
                </ul>
                <div className="button-container">
                    <button type="submit">
                        Add Note
                    </button>
                </div>
            </section>
        )     
    }
     
}