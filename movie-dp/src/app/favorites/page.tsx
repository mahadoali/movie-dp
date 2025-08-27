"use client";

import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/movieCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
