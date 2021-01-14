//-----------------------------------------------------------------------------------------
// IMPORT STATEMENTS
//-----------------------------------------------------------------------------------------
import React, { Component } from 'react';

//-----------------------------------------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------------------------------------
class NominationList extends Component {
    
    constructor(){
        super();

        this.clickedNomination = this.clickedNomination.bind(this);
    }

    clickedNomination(e){
        this.props.trackNomination(e.target.text);
    }

    render(){
        return (
        <div className="nominationContainer">
            <h2 className="nominationHeader">Nominations</h2>
            {this.props.data.nominations.map((nomination) => {
                return(
                    <div key={nomination} className = "individualNomination">
                        <a onClick={this.clickedNomination} value={nomination} href="#popup1" className = "nomination" key={nomination}>{nomination}</a>
                        <img className="deleteIcon" src="https://github.com/SG-Command/movieapp/blob/master/src/Images/delete-white-24dp.svg?raw=true/"/>
                    </div>
                )     
            })}
        </div>
    )
  }
}

export default NominationList;