import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import './Folder.css'
import NotefulContext from '../NotefulContext'


export default class Folder extends Component {
    static contextType = NotefulContext;
    // constructor(props){
    //     super(props);
    //     this.handleActive = this.handleActive.bind(this);
    //     this.state={
    //         active: false
    //     }  
    // }
    
    
    // handleActive(){
    //     const currentState = this.state.active;
    //     this.setState({
    //         active: !currentState
    //     })
    // };
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
                    <button className="add-folder">
                        Add Folder   
                    </button>    
                </Link>
            </div>
            
                                
        </div>
    )  
    }
}


