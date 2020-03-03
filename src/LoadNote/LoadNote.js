import React, { Component } from 'react'
import './LoadNote.css'

export default class LoadNote extends Component{
    render(){ 
        return(
            <div className="loaded-note">
                <article id={this.props.id} className="article">
                    <div>
                        <h2>{this.props.note.name}</h2>
                        <p>Date modified: {new Date(this.props.note.modified).toDateString()}</p>
                    </div>
                    <div className="button-container">
                        <button type="button" className="delete-note">Delete Note</button>
                    </div>
                </article>
                <article className="content">
                    {this.props.note.content}
                </article>

            </div>
            
        )
    }
}