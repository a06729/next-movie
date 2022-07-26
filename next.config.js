/** @type {import('next').NextConfig} */
const API_KEY=process.env.API_KEY;
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org','via.placeholder.com'],
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
      },
      {
        //영화 상세정보
        source:"/api/movies/post/:movieId",
        destination:`https://api.themoviedb.org/3/movie/:movieId?api_key=${API_KEY}&language=ko`
      },
      {
        //영화 출연진 정보
        source:"/api/movies/:movieId/credits",
        destination:`https://api.themoviedb.org/3/movie/:movieId/credits?api_key=${API_KEY}&language=ko`
      },
      {
        //TV 상세정보
        source:"/api/tv/post/:tvId",
        destination:`https://api.themoviedb.org/3/tv/:tvId?api_key=${API_KEY}&language=ko`
      },
      {
        //TV 출연진 정보
        source:"/api/tv/:tvId/credits",
        destination:`https://api.themoviedb.org/3/tv/:tvId/credits?api_key=${API_KEY}&language=ko`
      },
    ]
  }
}

module.exports = nextConfig
