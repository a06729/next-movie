import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Carousel from "../components/Carousel";
import { MovieType, nextMoveiType } from "../components/interface/MovieType";
import { tvType } from "../components/interface/TvType";
import index_css from "../styles/index.module.css";
import ScrollOut from "scroll-out";
import { contentTypes } from "../components/enum/contentType";
import card_css from "../styles/infoCard.module.css";
import { stringify } from "querystring";
import { urlEnum } from "../components/enum/urlEnum";

export default function Home({
  movie_data,
  nowMovie,
  nowTv,
}: {
  movie_data: MovieType[];
  nowMovie: MovieType;
  nowTv: tvType;
}) {
  const movie_ref = useRef<any>();
  const [moviePage, setMoviePage] = useState(2);
  const [movieMore, setMovieMore] = useState<MovieType[]>();
  async function movie_more() {
    let url:any="";
    if (process.env.NODE_ENV == "production") {
      url=urlEnum.production;
    }else{
      url=urlEnum.localhost;
    }
    //https://radlohead.gitbook.io/typescript-deep-dive/future-javascript/destructuring
    //비구조 할당 하는법
    const { results, ...info }: { results: MovieType[],total_pages: number} = await (await fetch(`${url}/api/movies/now/${moviePage}`)).json();
    if (info.total_pages >= moviePage) {
      console.log(results);
      setMovieMore((prev) => {
        if (prev === undefined) {
          return results;
        } else {
          results.forEach((data) => {
            prev!.push(data);
          });
          return prev;
        }
      });
      setMoviePage(moviePage + 1);
    } else {
      console.log(results);
    }
    
  }
  useEffect(() => {
    ScrollOut({});
  }, []);
  return (
    <div>
      <div data-scroll>
        <h1 className="font-jua text-xl">인기순</h1>
        <Carousel movie_data={movie_data}></Carousel>
      </div>
      <div data-scroll>
        <h1 className="font-jua text-xl">영화</h1>
        <div className={index_css.movie_content_container}>
          {nowMovie.results.map((data) => {
            return (
              <div
                className={index_css.movie_content_item}
                key={data.id}
                ref={movie_ref}
              >
                <div className={index_css.movie_content_item_card}>
                  <div className={card_css.cardContainer}>
                    <Link
                      href={`/post/${data.id}/${contentTypes.Movie}`}
                      passHref
                    >
                      <a>
                        <div className={card_css.cardImage}>
                          <Image
                            className="rounded-2xl"
                            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                            width={400}
                            height={400}
                            loading={"lazy"}
                          />
                        </div>
                      </a>
                    </Link>
                    <div className={card_css.cardTitle}>{data.title}</div>
                    <div className={card_css.cardOpenTitle}>
                      개봉일:{data.release_date}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {movieMore?.map((data) => {
            return (
              <div
                className={index_css.movie_content_item}
                key={data.id}
                ref={movie_ref}
              >
                <div className={index_css.movie_content_item_card}>
                  <div className={card_css.cardContainer}>
                    <Link
                      href={`/post/${data.id}/${contentTypes.Movie}`}
                      passHref
                    >
                      <a>
                        <div className={card_css.cardImage}>
                          <Image
                            className="rounded-2xl"
                            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                            width={400}
                            height={400}
                            loading={"lazy"}
                          />
                        </div>
                      </a>
                    </Link>
                    <div className={card_css.cardTitle}>{data.title}</div>
                    <div className={card_css.cardOpenTitle}>
                      개봉일:{data.release_date}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded font-jua"
            onClick={movie_more}
          >
            더보기
          </button>
        </div>
      </div>
      <div data-scroll>
        <h1 className="font-jua text-xl">스트리밍</h1>
        <div className={index_css.movie_content_container}>
          {nowTv.results.map((data) => {
            return (
              <div className={index_css.movie_content_item} key={data.id}>
                <div className={index_css.movie_content_item_card}>
                  <div className={card_css.cardContainer}>
                    <Link href={`/post/${data.id}/${contentTypes.Tv}`} passHref>
                      <a>
                        <div className={card_css.cardImage}>
                          <Image
                            className="rounded-2xl"
                            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                            width={400}
                            height={400}
                            loading={"lazy"}
                          />
                        </div>
                      </a>
                    </Link>
                    <div className={card_css.cardTitle}>{data.name}</div>
                    <div className={card_css.cardOpenTitle}>
                      방영일:{data.first_air_date}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  if (process.env.NODE_ENV == "production") {
    const [{ results }, nowMovie, nowTv]: [MovieType, MovieType, tvType] =
      await Promise.all([
        await (
          await fetch(
            `https://next-movie-czgv9jwqn-a06729.vercel.app/api/movies/pop/1`
          )
        ).json(),
        await (
          await fetch(
            `https://next-movie-czgv9jwqn-a06729.vercel.app/api/movies/now/1`
          )
        ).json(),
        await (
          await fetch(
            `https://next-movie-czgv9jwqn-a06729.vercel.app/api/tv/popular`
          )
        ).json(),
      ]);
    return {
      props: {
        movie_data: results,
        nowMovie: nowMovie,
        nowTv: nowTv,
      },
    };
  } else {
    const [{ results }, nowMovie, nowTv]: [MovieType, MovieType, tvType] =
      await Promise.all([
        await (await fetch(`http://localhost:3000/api/movies/pop/1`)).json(),
        await (await fetch(`http://localhost:3000/api/movies/now/1`)).json(),
        await (await fetch(`http://localhost:3000/api/tv/popular`)).json(),
      ]);
    return {
      props: {
        movie_data: results,
        nowMovie: nowMovie,
        nowTv: nowTv,
      },
    };
  }
}
