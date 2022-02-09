//MAIN View
import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';
export class MainView extends React.Component{
    constructor() {
      super();
      this.state = {
        movies: [],
        user: null
      };
    }
    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
        
      }
    }
      getMovies(token) {
        axios.get('https://muvies-app.herokuapp.com/Movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
      
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.UserName);
        this.getMovies(authData.token);
      }
      onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null
        });
      }
      render() {
        const { movies, user } = this.state;
    
        if (!user) return <Row>
          <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
        </Row>
        if (movies.length === 0) return <div key={} className="movie-Card" />;
    
        return (
          <Router>
          <div className="main-view">
{/* ------// DIRECTORS */}
          <Route path="/Movies/Director/:Name" render={({ match }) => {
  if (movies.length === 0) return <div className="director-view" />;
  return <Col md={8}>
    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
  </Col>
}
} />
{/* ------// MOVIES */}
          <Route path="/Movies/Name:" render={({ match }) => {
  if (movies.length === 0) return <div className="main-view" />;
  return <Col md={8}>
    <MovieView movie={movies.find(m => m.Movie.Title === match.params.Title).movies} />
  </Col>
}
} />
{/* ------// GENRE */}
<Route path="/Movies/Genre/:Name" render={({ match }) => {
  if (movies.length === 0) return <div className="genre-view" />;
  return <Col md={8}>
    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
  </Col>
}
} />
          </div>
       </Router>
        );
      }
    }
  



export default MainView;