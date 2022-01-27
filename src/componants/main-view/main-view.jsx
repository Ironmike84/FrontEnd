//MAIN View
import axios from 'axios';
import React from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';
export class MainView extends React.Component{
    constructor() {
      super();
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null
      };
    }
    componentDidMount(){
        axios.get('https://muvies-app.herokuapp.com/Movies')
          .then(response => {
            this.setState({
              movies: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });
      }

      setSelectedMovie(movie) {
        this.setState({
          selectedMovie: movie
        });
      }

      onLoggedIn(user) {
        this.setState({
          user
        });
      }
      render() {
        const { user, movies, selectedMovie } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    if (movies.length === 0) return <div className="main-view" />;

    return (
        <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
         ))
        }
      </div>
    );
  }

}
    
    

export default MainView;