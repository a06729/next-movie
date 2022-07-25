import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import slider from "../styles/carousel.module.css";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {MovieType} from "../components/interface/MovieType";


export default function Carousel({movie_data}:{movie_data:MovieType[]}) {
  // console.log(movie_data);
  const sliderRef = useRef<any>();
  const sliderInnerRef=useRef<any>();
  function right_move() {
    const slider=sliderRef.current;
    const itemsPerScreen = parseInt(getComputedStyle(slider).getPropertyValue("--items-per-screen"));
    sliderRef.current.scrollLeft += (sliderInnerRef.current.offsetWidth*itemsPerScreen);
  }
  function left_move() {
    const slider=sliderRef.current;
    const itemsPerScreen = parseInt(getComputedStyle(slider).getPropertyValue("--items-per-screen"));
    sliderRef.current.scrollLeft -= (sliderInnerRef.current.offsetWidth*itemsPerScreen);
  }
  return (
    <div>
      <div className={slider.btn_container}>
        <div>
          <span onClick={left_move}>
            <ArrowCircleLeftIcon
              className={slider.btn_left}
            ></ArrowCircleLeftIcon>
          </span>
        </div>
        <div>
          <span onClick={right_move}>
            <ArrowCircleRightIcon
              className={slider.btn_right}
            ></ArrowCircleRightIcon>
          </span>
        </div>
      </div>
      <div ref={sliderRef} className={slider.container}>
        {movie_data.map((data) => {
          return (
            <div ref={sliderInnerRef} className={slider.inner} key={data.poster_path}>
              <div className={slider.image_item}>
                <Image
                  className={slider.image_tag}
                  src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                  width={240}
                  height={400}
                  loading={'lazy'}
                />
                <div className={slider.text}>{data.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

