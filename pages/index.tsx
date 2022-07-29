import Link from "next/link";
import {useEffect,forwardRef } from "react";
import Image from "next/image";
import Carousel from "../components/Carousel";
import {MovieType} from "../components/interface/MovieType";
import {tvType} from "../components/interface/TvType";
import CardContent from "@mui/material/CardContent";
import { Button, Card, CardActions, Typography } from "@mui/material";
import index_css from "../styles/index.module.css";
import ScrollOut from "scroll-out";
import {contentTypes} from "../components/enum/contentType";



export default function Home({movie_data,nowMovie,nowTv}:{movie_data:MovieType[],nowMovie:MovieType,nowTv:tvType}){
  useEffect(()=>{
    ScrollOut({});
  },[]);
  return (
    <div>
      <div data-scroll>
        <h1 className="font-jua text-xl">인기순</h1>
        <Carousel movie_data={movie_data}></Carousel>
      </div>
      <div data-scroll>
        <h1 className="font-jua text-xl">영화</h1>
        <div className={index_css.movie_content_container}>
          {nowMovie.results.map((data)=>{
              return(          
              <div className={index_css.movie_content_item} key={data.id}>
                <div className={index_css.movie_content_item_card}>
                  <Card>
                    <CardContent className={index_css.movie_content_card_content}> 
                    <Link href={`/post/${data.id}/${contentTypes.Movie}`} passHref>
                    <a>
                        <div className={index_css.movie_content_item_card_imageContainer}>
                              <Image
                                className={index_css.movie_content_item_image}
                                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                                width={400}
                                height={400}
                                loading={'lazy'}
                              />
                        </div>
                      </a>
                      </Link>
                      <Typography className={index_css.movie_content_title} component="div">
                        {data.title}
                      </Typography>
                      <Typography component="div">
                        개봉일:{data.release_date}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </div>

              </div>);
          })}
        </div>
      </div>
      <div data-scroll>
        <h1 className="font-jua text-xl">스트리밍</h1>
        <div className={index_css.movie_content_container}>
          {nowTv.results.map((data)=>{
              return(          
              <div className={index_css.movie_content_item} key={data.id}>
                <div className={index_css.movie_content_item_card}>
                  <Card>
                    <CardContent className={index_css.movie_content_card_content}> 
                    <Link href={`/post/${data.id}/${contentTypes.Tv}`} passHref>
                    <a>
                        <div className={index_css.movie_content_item_card_imageContainer}>
                              <Image
                                className={index_css.movie_content_item_image}
                                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                                width={400}
                                height={400}
                                loading={'lazy'}
                              />
                        </div>
                      </a>
                      </Link>
                      <Typography className={index_css.movie_content_title} component="div">
                        {data.name}
                      </Typography>
                      <Typography component="div">
                        개봉일:{data.release_date}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </div>

              </div>);
          })}
        </div>
      </div>
    </div>
    
  );
}

export async function getServerSideProps(){
  if(process.env.NODE_ENV=='production'){
    const [{results},nowMovie,nowTv]:[MovieType,MovieType,tvType]=await Promise.all([
      await (await fetch(`https://next-movie-czgv9jwqn-a06729.vercel.app/api/movies/pop/1`)).json(),
      await(await fetch(`https://next-movie-czgv9jwqn-a06729.vercel.app/api/movies/now`)).json(),
      await(await fetch(`https://next-movie-czgv9jwqn-a06729.vercel.app/api/tv/popular`)).json()
    ]);
    return {
      props:{
        movie_data:results,
        nowMovie:nowMovie,
        nowTv:nowTv
      }
    };
  }else{
    const [{results},nowMovie,nowTv]:[MovieType,MovieType,tvType]=await Promise.all([
      await (await fetch(`http://localhost:3000/api/movies/pop/1`)).json(),
      await(await fetch(`http://localhost:3000/api/movies/now`)).json(),
      await(await fetch(`http://localhost:3000/api/tv/popular`)).json()
    ]);
    return {
      props:{
        movie_data:results,
        nowMovie:nowMovie,
        nowTv:nowTv
      }
    };
  }
}

