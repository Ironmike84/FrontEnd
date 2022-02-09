import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss'
export class MovieCard extends React.Component {
render() {
    const { movie, onMovieClick } = this.props;
    return (
        <Card style={{width: '350px', backgroundColor: 'rgb(0, 0, 0)'}}>
          <Card.Img style={{width: '250px',height:'350px'}} variant="top"  src={movie.ImagePath}/>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Button class='btn btn-primary' onClick={() => onMovieClick(movie)}>Open</Button>
          </Card.Body>
        </Card>
      );
    }
  }

MovieCard.propTypes = {
    movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };
