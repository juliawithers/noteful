import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import './Folder.css'
import NotefulContext from '../NotefulContext'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default class Folder extends Component {
    static contextType = NotefulContext;
    render(){
       return(
        <div className="folder-nav">
            {this.context.folders.map(item => 
                <article key={item.id} className="unhighlighted">
                    <NavLink 
                        className='foldernav-link'
                        onClick={this.handleActive}
                        value={`/folder/${item.id}`}
                        to={`/folder/${item.id}`}>
                            <h2 className="title">
                              {item.name}   
                            </h2>
                    </NavLink>
                </article> )}
            <div className="button-container-nav">
                <Link to={'/add-folder'}>
                    <button 
                        aria-label="add-folder"
                        className="add-folder">
                        <FontAwesomeIcon icon={faPlus}/> Folder   
                    </button>    
                </Link>
            </div>           
        </div>
    )  
    }
}


