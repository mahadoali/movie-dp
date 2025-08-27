import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
}

interface ApiResponse {
  results: Movie[];
  totalPages: number;
}

export async function fetchLatestMovies(page: number = 1): Promise<ApiResponse> {
  const { data } = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page,
    },
  });
  return {
    results: data.results,
    totalPages: data.total_pages,
  };
}

export async function searchMovies(query: string, page: number = 1): Promise<ApiResponse> {
  if (!query) {
    return { results: [], totalPages: 0 };
  }

  const { data } = await axios.get(`${BASE_URL}/search/multi`, {
    params: {
      api_key: API_KEY,
      query,
      language: "en-US",
      page,
    },
  });

  return {
    results: data.results,
    totalPages: data.total_pages,
  };
}
