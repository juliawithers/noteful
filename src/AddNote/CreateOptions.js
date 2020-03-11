import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CreateOptions extends Component{
    render(){
        const folder = this.props.folderList.map(folder => {
            return <option value={folder.id} id={folder.id} key={folder.id}>{folder.name}</option>
        })
        return(
            folder
        )
    }
}

CreateOptions.propTypes = {
    folderList: PropTypes.array.isRequired
}