//-----------------------------------------------------------------------------------------
// IMPORT STATEMENTS
//-----------------------------------------------------------------------------------------
import React, { Component } from 'react';

//-----------------------------------------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------------------------------------
class Movie extends Component {

    constructor(){
        super();
        
        this.state = {
            nominateBtnClass: "nominateBtn"
        }

        this.createURL = this.createURL.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.data != this.props.data){
            var i;
            for(i=0; i< this.props.data.nominations.length; i++){
                if(this.props.data.nominations[i] === this.props.movie.Title){
                    this.setState({nominateBtnClass: "nominateBtnDisabled"});
                } else {
                    this.setState({nominateBtnClass: "nominateBtn"});
                }
            }
           console.log(this.props.movie.Title, this.state.nominateBtnClass, "Check") 
        }
    }

    // FUNCTIONS
    createURL(imdbID){
        var newurl = 'https://www.imdb.com/title/'+imdbID+'/'
        return newurl
    }

    handleClick = (e) => {
        this.props.nominateMovie(e.target.value);
    }

    render(){
        return(
            <div className="movieContainer">
                <img className ="poster" alt="Movie Poster" src={this.props.movie.Poster}></img>
                <a className="title" href={this.createURL(this.props.movie.imdbID)}>{this.props.movie.Title}</a>
                    <div className="yearContainer">
                        <span className="descYear">Year:</span>
                        <span className="year">{this.props.movie.Year}</span>
                    </div>
                    <button className={this.state.nominateBtnClass} value={this.props.movie.Title} onClick={this.handleClick}>Nominate</button>
                </div>
        )
    }
}

export default Movie;