import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { deleteMovie } from "../actions/movieActions";
import { addFavorite } from "../actions/favoritesActions";

const Movie = (props) => {
  const { id } = useParams();
  const { push } = useHistory();

  const { movies } = props;

  const movie = movies.filter((movie) => movie.id === Number(id))[0];
  // console.log(movie);
  // console.log(movies);

  const handleDeleteMovie = (id) => {
    props.deleteMovie(id);
    push("/movies");
  };

  const handleAddFavorite = (id) => {
    props.addFavorite(id);
  };
  return (
    <div className="modal-page col">
      {movie && (
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{movie.title} Details</h4>
            </div>
            <div className="modal-body">
              <div className="flexContainer">
                <section className="movie-details">
                  <div>
                    <label>
                      Title: <strong>{movie.title}</strong>
                    </label>
                  </div>
                  <div>
                    <label>
                      Director: <strong>{movie.director}</strong>
                    </label>
                  </div>
                  <div>
                    <label>
                      Genre: <strong>{movie.genre}</strong>
                    </label>
                  </div>
                  <div>
                    <label>
                      Metascore: <strong>{movie.metascore}</strong>
                    </label>
                  </div>
                  <div>
                    <label>Description:</label>
                    <p>
                      <strong>{movie.description}</strong>
                    </p>
                  </div>
                </section>

                <section>
                  <span
                    className="m-2 btn btn-dark"
                    onClick={() => {
                      handleAddFavorite(movie);
                    }}
                  >
                    {" "}
                    Favorite
                  </span>
                  <span className="delete">
                    <input
                      type="button"
                      className="m-2 btn btn-danger"
                      value="Delete"
                      onClick={() => {
                        handleDeleteMovie(movie.id);
                      }}
                    />
                  </span>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies,
    displayFavorites: state.favorites.displayFavorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMovie: (id) => dispatch(deleteMovie(id)),
    addFavorite: (movie) => dispatch(addFavorite(movie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
