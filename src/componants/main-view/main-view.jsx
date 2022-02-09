//MAIN View
import axios from 'axios';
import React from 'react';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      setSelectedMovie(movie) {
        this.setState({
          selectedMovie: movie
        });
      }

      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
      
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Userame);
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
        const { user, movies, selectedMovie } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    if (movies.length === 0) return <div className="main-view" />;

    return (
        
        <div className="main-view">
             <button class='btn btn-danger' style={{margin:'10px'}} onClick={() => { this.onLoggedOut() }}>Logout</button>
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
          ? (<Row className="justify-content-md-center">
         
            <Col md={4} >
          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          </Col>
          </Row>
          )
          : (
          <Row className="justify-content-md-center" >
            {movies.map(movie => 
          (<MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
          ))}
          </Row>)}
      </div>
    );
  }

}


export default MainView;