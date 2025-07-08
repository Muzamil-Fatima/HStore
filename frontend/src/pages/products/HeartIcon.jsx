import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorite/favoriteSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));

      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));

      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-gray-500" />
      )}
    </div>
  );
};

export default HeartIcon;
