import React from 'react'
import './NoteShortList.css'
import NoteHeader from '../NoteHeader/NoteHeader'

export default function NoteShortList(props)  {
    return (
        <section>
            <ul>
                {props.notes.map(item=>
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
                <button type="submit">
                    Add Note
                </button>
            </div>
        </section>
    )  
}