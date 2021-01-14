//-----------------------------------------------------------------------------------------
// IMPORT STATEMENTS
//-----------------------------------------------------------------------------------------
import React, { Component } from 'react';
import Movie from './Movie';

//-----------------------------------------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------------------------------------
class MovieList extends Component {

    constructor(){
        super();
        
        this.state = {
            nominateBtnClass: "nominateBtn"
        }

        this.createURL = this.createURL.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateNominateState = this.updateNominateState.bind(this);
    }
    
    // FUNCTIONS
    createURL(imdbID){
        var newurl = 'https://www.imdb.com/title/'+imdbID+'/'
        return newurl
    }

    handleClick = (e) => {
        this.props.nominateMovie(e.target.value)
    }

    updateNominateState(title){
        var i;
            var moviePresent = false;
            for(i=0; i< this.props.data.nominations.length; i++){
                if(this.props.data.nominations[i] === title){
                    moviePresent = true;
                    return "nominateBtnDisabled";
                }
            }
            if(moviePresent === false){
                return "nominateBtn";
            }
    }

    render(){
        return (
            <div className="movieBox">
            {this.props.data.movieList.map((movie) => {
                return(
                    <div key={movie.Title} className="movieContainer">
                        <img className ="poster" alt="Movie Poster" src={movie.Poster}></img>
                        <a className="title" href={this.createURL(movie.imdbID)}>{movie.Title}</a>
                            <div className="yearContainer">
                                <span className="descYear">Year:</span>
                                <span className="year">{movie.Year}</span>
                            </div>
                        <button className={this.updateNominateState(movie.Title)} value={movie.Title} onClick={this.handleClick}>Nominate</button>
                    </div>
                )     
            })}
            </div>
        )
    }
}

export default MovieList;