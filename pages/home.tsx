import { useEffect, useRef } from "react";
import CircularProgress from "../components/CircularProgress";
import homeCss from "../styles/home.module.css";

export default function home(){
    return(
        <div>
            <h1 className={homeCss.test}>홈</h1>
            <CircularProgress ratingData={40}></CircularProgress>
        </div>
    );
}