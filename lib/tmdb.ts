const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function fetchMovieDetails(title: string) {
  const res = await fetch(`${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(title)}&api_key=${TMDB_API_KEY}`)
  const data = await res.json()

  if (!data.results || data.results.length === 0) return null

  const movie = data.results[0]
  return {
    title: movie.title,
    overview: movie.overview,
    posterUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null
  }
}
