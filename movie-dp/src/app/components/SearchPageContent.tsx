"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchMovies } from "../utils/fetchmoviedb";
import MovieCard from "./movieCard";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
}

function hasId(movie: unknown): movie is Movie {
  return (
    typeof movie === "object" &&
    movie !== null &&
    "id" in movie &&
    typeof (movie as Record<string, unknown>).id === "number"
  );
}

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("query") ?? "";
  const initialPage = parseInt(searchParams.get("page") ?? "1");

  const [query, setQuery] = useState<string>(initialQuery);
  const [page, setPage] = useState<number>(initialPage);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery);
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    async function fetchResults() {
      if (!debouncedQuery) {
        setResults([]);
        setLoading(false);
        setTotalPages(0);
        return;
      }
      setLoading(true);
      try {
        const { results: movies, totalPages } = await searchMovies(debouncedQuery, page);
        const filtered = movies.filter(hasId);
        setResults(filtered);
        setTotalPages(totalPages ?? 0);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setResults([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();

    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (page > 1) params.set("page", page.toString());
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, page, query, router]);

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <section className="p-8">
      <form onSubmit={(e) => e.preventDefault()} className="mb-6">
        <input
          type="text"
          placeholder="Search movies or series"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full max-w-md"
          autoFocus
        />
      </form>

      {loading ? (
        <p>Searching...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {results.length === 0 && query ? (
              <p>No results found for &quot;{query}&quot;.</p>
            ) : (
              results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded text-white bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded text-white bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
