import { useRef, useState} from "react";
import Image from "next/image";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {MovieActorType} from "../components/interface/ActorType";
import slider from "../styles/carousel.module.css";
import errorlogo from "../public/error.jpeg";

export default function ActorCarousel({actorData}:{actorData?:MovieActorType|undefined}) {
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
            <ArrowCircleLeftIcon sx={{ fontSize:40 }} className={`${slider.btn_left}`} ></ArrowCircleLeftIcon>
          </span>
        </div>
        <div>
          <span onClick={right_move}>
            <ArrowCircleRightIcon sx={{ fontSize:40 }} className={`${slider.btn_right}`}></ArrowCircleRightIcon>
          </span>
        </div>
      </div>
      <div ref={sliderRef} className={slider.container}>
        {actorData?.cast.map((data) => {
          const actorImage=`https://image.tmdb.org/t/p/w500/${data.profile_path}`;
          const [error, setError] = useState(false);
          return (
            <div ref={sliderInnerRef} className={slider.inner} key={data.id}>
              <div className={slider.image_item}>
                    <Image
                      className={slider.image_tag}
                      src={error?errorlogo:actorImage}
                      width={240}
                      height={400}
                      loading={'lazy'}
                      onError={()=>setError(true)}
                    />
                <div className={slider.text}>{data.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
