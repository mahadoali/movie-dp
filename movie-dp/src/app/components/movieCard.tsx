"use client";
import Image from "next/image";
import { useFavorites } from "../context/FavoritesContext";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = () => {
    if (favorite) removeFavorite(movie.id);
    else addFavorite(movie);
  };

  return (
    <div className="bg-white rounded shadow p-4">
      {movie.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title || movie.name || ""}
          width={300}
          height={450}
          className="rounded"
          priority={false}
        />
      )}
      <h3 className="font-semibold mt-2">{movie.title || movie.name}</h3>
      <p>Release Date: {movie.release_date || movie.first_air_date}</p>
      <button
        onClick={toggleFavorite}
        className={`mt-2 px-3 py-1 rounded text-white ${
          favorite ? "bg-red-600" : "bg-blue-600"
        }`}
      >
        {favorite ? "Remove Favorite" : "Add Favorite"}
      </button>
    </div>
  );
}
