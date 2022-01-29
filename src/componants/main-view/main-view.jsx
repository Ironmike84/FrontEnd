import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';
export class MainView extends React.Component {
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

setSelectedMovie(newSelectedMovie) {
    this.setState({
        selectedMovie: newSelectedMovie
    });
}

onLoggedIn(user) {
  this.setState({
    user
  });
}
render() {
  const { movies, selectedMovie, user } = this.state;

  /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
  if (!user)
  return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

  // Before the movies have been loaded
  if (movies.length === 0)
  return <div className="main-view" />;


  return (
    <div className="main-view">
        {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
        ))
      }
      <div>
      </div>
    </div>
  );
}

}

export default MainView;