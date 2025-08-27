import { useState, useEffect } from "react";
import { fetchLatestMovies } from "../utils/fetchmoviedb";

interface Movie {
  id: number;
  title: string;
}

interface ApiResponse {
  results: Movie[];
  totalPages: number;
}

export function useFetchMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
     
        const response = (await fetchLatestMovies()) as ApiResponse;
        if (isMounted) {
          setMovies(response.results);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  return { movies, loading, error };
}
