import React, { Component } from 'react'

export default class Exercise extends Component {   

    render() {
        return (
            <div className="exerciseComponent">
                {this.props.text}
            </div>
        )
    }
}


