import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import Carousel from "../components/Carousel";
import {MovieType} from "../components/interface/MovieType";
import {tvType} from "../components/interface/TvType";
import CardContent from "@mui/material/CardContent";
import { Button, Card, CardActions, CardMedia, Typography } from "@mui/material";
import index_css from "../styles/index.module.css";
// import TypeIt from "typeit-react";
import ScrollOut from "scroll-out";


export default function Home({movie_data,nowMovie,nowTv}:{movie_data:MovieType[],nowMovie:MovieType,nowTv:tvType}){
  useEffect(()=>{
    ScrollOut({});
  },[])
  return (
    <div>
      <div data-scroll>
        <h1>인기순</h1>
        <Carousel movie_data={movie_data}></Carousel>
      </div>
      <div data-scroll>
        <h1>영화</h1>
        <div className={index_css.movie_content_container}>
          {nowMovie.results.map((data)=>{
              return(          
              <div className={index_css.movie_content_item} key={data.id}>
                <div className={index_css.movie_content_item_card}>
                  <Card>
                    <CardContent className={index_css.movie_content_card_content}> 
                      <div className={index_css.movie_content_item_card_imageContainer}>
                            <Image
                              className={index_css.movie_content_item_image}
                              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                              width={400}
                              height={400}
                            />
                      </div>
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
        <h1>스트리밍</h1>
        <div className={index_css.movie_content_container}>
          {nowTv.results.map((data)=>{
              return(          
              <div className={index_css.movie_content_item} key={data.id}>
                <div className={index_css.movie_content_item_card}>
                  <Card>
                    <CardContent className={index_css.movie_content_card_content}> 
                      <div className={index_css.movie_content_item_card_imageContainer}>
                            <Image
                              className={index_css.movie_content_item_image}
                              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                              width={400}
                              height={400}
                            />
                      </div>
                      <Typography className={index_css.movie_content_title} component="div">
                        {data.name}
                      </Typography>
                      <Typography component="div">
                        방영일:{data.first_air_date}
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
  const [{results},nowMovie,nowTv]:[MovieType,MovieType,tvType]=await Promise.all([
    await (await fetch(`http://localhost:3000/api/movies/pop/1`)).json(),
    await(await fetch(`http://localhost:3000/api/movies/now`)).json(),
    await(await fetch(`http://localhost:3000/api/tv/popular`)).json()
  ])
  //const {results}:MovieType = await (await fetch(`http://localhost:3000/api/movies/pop`)).json();
  //const nowMovie:MovieType=await(await fetch(`http://localhost:3000/api/movies/now`)).json();
  // console.log(nowMovie);
  return {
    props:{
      movie_data:results,
      nowMovie:nowMovie,
      nowTv:nowTv
    }
  };
}

