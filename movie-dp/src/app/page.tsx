import MovieCard from "./components/movieCard";
import { fetchLatestMovies } from "./utils/fetchmoviedb";
import Link from "next/link";
import { Suspense } from "react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1");
  const { results: movies, totalPages } = await fetchLatestMovies(currentPage);

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-6">Latest Movies</h1>
      <Suspense fallback={<div>Loading latest movies...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </Suspense>
      <div className="flex justify-center items-center space-x-4 mt-8">
        <Link
          href={`/?page=${currentPage - 1}`}
          className={`px-4 py-2 rounded text-white ${
            currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
          }`}
          aria-disabled={currentPage === 1}
          tabIndex={currentPage === 1 ? -1 : 0}
        >
          Previous
        </Link>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Link
          href={`/?page=${currentPage + 1}`}
          className={`px-4 py-2 rounded text-white ${
            currentPage >= totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600"
          }`}
          aria-disabled={currentPage >= totalPages}
          tabIndex={currentPage >= totalPages ? -1 : 0}
        >
          Next
        </Link>
      </div>
    </section>
  );
}
