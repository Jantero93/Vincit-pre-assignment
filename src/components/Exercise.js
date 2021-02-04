import React, { Component } from 'react'

export default class Exercise extends Component {   

    render() {
        console.log("tehtävän propsit",this.props)
     
        return (
            <div className="exerciseComponent">
                TEHTÄVÄ TESTI
            </div>
        )
    }
}


