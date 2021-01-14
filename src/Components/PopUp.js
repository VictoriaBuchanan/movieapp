//-----------------------------------------------------------------------------------------
// IMPORT STATEMENTS
//-----------------------------------------------------------------------------------------
import React, { Component } from 'react';

//-----------------------------------------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------------------------------------
class PopUp extends Component {
    
    constructor(){
        super();
        this.delete = this.delete.bind(this);
    }

    delete(){
        this.props.delete();
    }

    render(){
        return (
        <div id="popup1" className="overlay">
            <div className="popup">
                <h2>Would you like to Delete the Movie?</h2>
                <a onClick ={this.delete} className="close1" href="#">Yes</a>
                <a className="close2" href="#">No</a>
            </div>
        </div>
    )
  }
}

export default PopUp;