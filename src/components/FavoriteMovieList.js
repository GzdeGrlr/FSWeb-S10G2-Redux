import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { removeFavorite } from "../actions/favoritesActions";

const FavoriteMovieList = (props) => {
  const { favorites, removeFavorite, displayFavorites } = props;

  const handleRemoveFavorites = (id) => {
    removeFavorite(id);
  };

  return (
    <div className="col-xs savedContainer">
      <h5>Favorite Movies</h5>
      {displayFavorites && (
        <div>
          {" "}
          {favorites.map((movie) => {
            return (
              <div key={movie.id}>
                <Link
                  className="btn btn-light savedButton"
                  to={`/movies/${movie.id}`}
                >
                  {movie.title}
                  <span>
                    <span
                      class="material-icons"
                      onClick={() => {
                        handleRemoveFavorites(movie.id);
                      }}
                    >
                      remove_circle
                    </span>
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites.favorites,
    displayFavorites: state.favorites.displayFavorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavorite: (id) => dispatch(removeFavorite(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteMovieList);
