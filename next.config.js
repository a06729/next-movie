/** @type {import('next').NextConfig} */
const API_KEY=process.env.API_KEY;
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  async rewrites(){
    return [
      {
        source:"/api/movies/pop/:page",
        destination:`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko&region=KR&page=:page`
      },
      {
        source:"/api/movies/now",
        destination:`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&region=KR`
      },
      {
        source:"/api/tv/popular",
        destination:`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=ko&region=KR`
      }
    ]
  }
}

module.exports = nextConfig
