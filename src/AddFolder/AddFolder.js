import React, { Component } from 'react'

export default class AddFolder extends Component{

    handleSubmit = e => {
        e.preventDefault()
        console.log(e.target.value)
        const folderName = e.target.value;
        console.log(folderName)

        fetch(`http://localhost:9090/folders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            'id':'placeholder',
            'name': `${folderName}`})
        })
        .then(res => {
            if (!res.ok) {
                throw `Could not add folder ${folderName}`
            }
            console.log(res.json())
            return res.json()
        })
        .then( resJson => {
            console.log(resJson)
            // this.props.history.push(`/folder/${folderId}`)
            // this.context.deleteNote(noteId)
        })
        .catch(error => {
            console.error(error)
        })
    }

    handleCancelFolder = () => {
        this.props.history.push('/')
    }

    render(){
        console.log('AddFolder was run')
        return(
            <div>
                <div className="add-folder-error">

                </div>
                <form 
                    onSubmit={this.handleSubmit}
                   >
                    <label htmlFor='folderName'>
                        Folder Name
                        {' '}
                    </label>
                    <input 
                        type='text'
                        name='folderName'
                        id='folderName'
                        placeholder='Example Note Title'
                        required
                    />
                    <button onClick={this.handleCancelFolder}>
                        Cancel
                    </button>
                    <button type='submit'>
                        Submit
                    </button>
                </form>    
            </div>
            
        )
    }
}