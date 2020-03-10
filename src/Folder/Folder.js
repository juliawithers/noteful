import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import './Folder.css'
import NotefulContext from '../NotefulContext'


export default class Folder extends Component {
    static contextType = NotefulContext;
    render(){
       return(
        <div>
            {this.context.folders.map(item => 
                <article key={item.id} className="unhighlighted">
                    <h2 className="title">
                    <NavLink 
                        className='foldernav-link'
                        to={`/folder/${item.id}`}>
                        {item.name}
                    </NavLink>
                    </h2>
                </article> )}
            <div className="button-container-nav">
                <Link to={'/add-folder'}>
                    <button className="add-folder">
                        Add Folder   
                    </button>    
                </Link>
            </div>
            
                                
        </div>
    )  
    }
}


