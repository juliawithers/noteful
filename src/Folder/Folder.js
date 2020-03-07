import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Folder.css'
import NotefulContext from '../NotefulContext'

export default class Folder extends Component {
    static contextType = NotefulContext;
    render(){
       return(
        <div>
            {this.context.folders.map(item => 
                <article key={item.id}>
                    <h2>
                    <Link to={`/folder/${item.id}`}>
                    {item.name}
                    </Link>
                    </h2>
                </article> )}
            <button className="add-folder">
                Add Folder    
            </button>                    
        </div>
    )  
    }
   
}


