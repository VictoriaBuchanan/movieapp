//-----------------------------------------------------------------------------------------
// IMPORT STATEMENTS
//-----------------------------------------------------------------------------------------
import React, { Component } from 'react';
//Components
import MovieList from './Components/MovieList';
import NominationList from './Components/NominationList';
import PopUp from './Components/PopUp';

//-----------------------------------------------------------------------------------------
// COMPONENT
//-----------------------------------------------------------------------------------------
class App extends Component {

  constructor(){
    super();

    // Initial State
    this.state = {  movieList: [],
                    nominations: [],
                    titleSearch: "",
                    searchTerm: "",
                    clickedItem: "",
                    nominateBtn: "", 
                    nominationBannerClass: "nominationBannerHidden"}
    
    //Functions
    this.createArrayofTitleKey = this.createArrayofTitleKey.bind(this);
    this.deleteNomination = this.deleteNomination.bind(this);
    this.nominationButton = this.nominationButton.bind(this);
    this.nominateMovie = this.nominateMovie.bind(this);
    this.removeDuplicates = this.removeDuplicates.bind(this);
    this.searchAPI = this.searchAPI.bind(this);
    this.updateMovieURL = this.updateMovieURL.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);

    //References
    this.updateNominateState = React.createRef();
  }

  createArrayofTitleKey(objectList){
    /**Takes an input that is an array of movie objects. Converts all the Title keys of the
    of the object into an array. Returns the array of titles. **/

    var i;
    var keyList = [];
    for(i=0;i<objectList.length;i++){
      keyList.push(objectList[i].Title);
    }
    return keyList;
  }

  deleteNomination(){
    /**Takes no input. Loops through all the nominations to find the nomination that was clicked and
    removes it from the array. The function then saves the new array to the state. **/
    var i;
    for(i=0;i<this.state.nominations.length; i++){
      /*Checks if the current nomination is equal to the value of the clicked nomination.*/
      if(this.state.nominations[i]=== this.state.clickedItem){
        /*Creates a new array of nominations without the clicked item*/
        var newArray = this.state.nominations
        newArray.splice(i,1)
        this.setState({nominations: newArray})
      }
    }
    this.updateNominateState.current.updateNominateState();
    this.setState({nominationBannerClass: "nominationBannerHidden"});
  }

  nominationButton(nomination){
    /**Takes a nominated movie as an input. Saves the nominated movie to the state so that it can be refenced later
    in the deleteNomination() function if the user chooses to delete the nomination. **/

    this.setState({clickedItem: nomination});
    this.updateNominateState.current.updateNominateState();
  }

  nominateMovie(movie){
    /**Takes string of a movie title as an input. Checks to see if the movie was previously nominated and if there are less
    than 5 nominations. If so the nominations array is updated to include the new movie.**/

    // Checks to see if the movie was nominated
    if(this.state.nominations === 0){
      var newArray = [movie]
      this.setState({nominations: newArray})
    } else {
      var i;
      var movieNominated = false;
      for(i=0;i<this.state.nominations.length; i++) {
        if(this.state.nominations[i]=== movie){
          movieNominated = true;
          break;
        }
      }

      // Updates the nomination array if the movie was not nomitated and there are less than 5 nominations
      if (movieNominated === false && this.state.nominations.length <5){
        var array = this.state.nominations
        array.push(movie)
        this.setState({nominations: array})
        //Updates the nomination banner state if 5 movies have been nominated
        if(array.length === 5){
          this.setState({ nominationBannerClass: "nominationBanner"});
        }
      }


    }
  }

  removeDuplicates(movieArray){
    /**Takes the array of movie objects from the API pull as in input. Loops through the array to see if there are any
     duplicate entries. Removes the duplicates entries. The function can only remove one duplicate at a time.**/
    
    var adjMovieArray = movieArray;
    var noDuplicates = false;
    
    while (noDuplicates === false) {
      var i;
      noDuplicates = true;
      var titleList = this.createArrayofTitleKey(adjMovieArray);
      /*Loops through the titleList until it finds a duplicate. Breaks after a duplicate is found to avoid indexing issues.*/
      for (i=0; i<titleList.length;i++){
        if(titleList.indexOf(titleList[i]) !== i){
          adjMovieArray.splice(i,1);
          noDuplicates = false;
          break;
        }
      }
    }
  }

  searchAPI(){
    /*Takes no input. Creates a url to make a call to the OMDb API which returns an array with up to 10
    movie objects that match the search terms. Saves the array of movies to the state.*/
    
    var apiURL = 'https://www.omdbapi.com/?i=tt3896198&apikey=e919a77&s='
    var i;

    // Concatenates the URL for the API pull
    for(i=0;i<this.state.searchTerm.length;i++){
      if (this.state.searchTerm[i] !== " "){
        apiURL = apiURL + this.state.searchTerm[i]
      } else if (this.state.searchTerm[i] === " "){
        apiURL = apiURL + "+"
      }
    }

    //Add the type field to ensure only movies are searched
    apiURL = apiURL + "&type=movie"

    // Makes the call to the OMDb API
    fetch(apiURL).then(response => response.json()).then(data => {
      this.removeDuplicates(data.Search)
      var finalArray = this.updateMovieURL(data.Search);
      this.setState({movieList: finalArray},);
    }).catch(error => console.log('error', error));
  }

  updateMovieURL(movieArray){
    /*Takes the array of movies from the state as an input. Loops through the array and looks to see if there are any 
    movies missing a poster. If so it replaces the URL with a stock image. Returns an array with the adjusted links.*/
    
    var i;
    var newMovieArray = movieArray;
    for (i=0; i<movieArray.length; i++){
      if(movieArray[i].Poster === "N/A") {
        newMovieArray[i].Poster = "https://github.com/SG-Command/movieapp/blob/master/src/Images/MovieFilm.png?raw=true";
      }
    }
    return newMovieArray
  }

  updateSearchTerm(event){
    /*Takes an event from the text input as an input. Saves the input to the state.*/
    this.setState({searchTerm: event.target.value});
  }

  // HTML for the webpage
  render(){
    return (
      <div>
        <div className="banner">
          <img className="award" alt="Emmy Statue" src="https://github.com/SG-Command/movieapp/blob/master/src/Images/EmmyTrophy.png?raw=true"/>
          <h1 className="shoppies">The Shoppies</h1>
          <img className="award" alt="Emmy Statue" src="https://github.com/SG-Command/movieapp/blob/master/src/Images/EmmyTrophy.png?raw=true"/>
        </div>
        <div className="bannerContainer">
          <div className={this.state.nominationBannerClass}>
            <span>Nominations Completed!</span>
          </div>
        </div>
        <div className ="topBoxes">
        <div className="searchBox">
          <h2 className="searchHeader">Search Criteria</h2>
          <div className="searchContent">
            <label className="searchLabel" htmlFor="movieTitle"></label>
            <input className ="searchTerm" placeholder="Enter a Movie..." onChange={this.updateSearchTerm} name="movieTitle" type="text"></input>
            <button className="searchBtn" type="submit" onClick={this.searchAPI}>Search</button>
          </div>
        </div>
        <NominationList data={this.state} trackNomination={this.nominationButton}/>
        </div>
        <PopUp deleteNomination={this.deleteNomination} delete={this.deleteNomination}/>
        <h2 className = "movieHeader" >Movies</h2>
        <div>
        <MovieList ref={this.updateNominateState} data={this.state} nominateMovie={this.nominateMovie}/>
        </div>
      </div>
    )
  }
}

export default App;